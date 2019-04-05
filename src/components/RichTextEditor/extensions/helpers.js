const GridItemSplitListItem = (itemType) => (state, dispatch) => {
  let {$from, $to, node} = state.selection
  if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) return false
  let grandParent = $from.node(-1)
  if (grandParent.type != itemType) return false
  let nextType = $to.pos == $from.end() ? grandParent.contentMatchAt($from.indexAfter(-1)).defaultType : null
  let tr = state.tr.delete($from.pos, $to.pos)
  let types = nextType && [null, {type: nextType}]
  if (!GridItemCanSplit(tr.doc, $from.pos, 2, types)) return false
  if (dispatch) dispatch(tr.split($from.pos, 2, types).scrollIntoView())
  return true
}

function GridItemCanSplit(doc, pos, depth = 1, typesAfter) {
  let $pos = doc.resolve(pos), base = $pos.depth - depth
  let innerType = (typesAfter && typesAfter[typesAfter.length - 1]) || $pos.parent
  if (base < 0 || $pos.parent.type.spec.isolating ||
      !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) ||
      !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount)))
    return false
  for (let d = $pos.depth - 1, i = depth - 2; d > base; d--, i--) {
    let node = $pos.node(d), index = $pos.index(d)
    if (node.type.spec.isolating) return false
    let rest = node.content.cutByIndex(index, node.childCount)
    let after = (typesAfter && typesAfter[i]) || node
    if (after != node) rest = rest.replaceChild(0, after.type.create(after.attrs))
    if (!node.canReplace(index + 1, node.childCount) || !after.type.validContent(rest))
      return false
  }
  let index = $pos.indexAfter(base)
  let baseType = typesAfter && typesAfter[0]
  return $pos.node(base).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type)
}

export {
  GridItemSplitListItem,
  GridItemCanSplit
}
