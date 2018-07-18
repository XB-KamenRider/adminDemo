/*
 * description： 本项目公用方法
 * author： liudehua
 */

(function (window) {
  const Common = {};
  // 选中table对应行
  Common.pitchOnTable = function (vm,id = 'id',singleTable = 'singleTable') {
    if (vm.itemId) {
      let array = vm.list;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element[id] == vm.itemId) {
          // 需要异步操作，不然无法选中
          setTimeout(() => {
            vm.$refs[singleTable].setCurrentRow(array[index]);
            setTimeout(() => {
              vm.$refs[singleTable] ? vm.$refs[singleTable].setCurrentRow() : '';
            }, 1500);
          }, 30)
          break;
        }
      }
    }
  }
  // 删除如果是当前页最后一项 则返回上一页列表
  Common.delPageIndex = function (list, pageIndex) { 
    if(list.length == 1 && pageIndex > 1) {
      return pageIndex - 1
    }else {
      return pageIndex
    }
  }
  window.Common = Common;
})(window);

export default {
  install: function (Vue) {
    Vue.Common
  }
}
