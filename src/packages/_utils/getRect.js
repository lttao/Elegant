export function getRect(selector, all) {
  return new Promise(resolve => {
    uni
      .createSelectorQuery()
      .in(this)
      [all ? "selectAll" : "select"](selector)
      .boundingClientRect(rect => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        } else if (!all && rect) {
          resolve(rect);
        }
      })
      .exec();
  });
}
