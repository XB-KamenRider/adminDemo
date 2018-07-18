import Vue from 'vue'

//时间戳转换为自己想要的格式
// 用法  new Date(dateValue).format('yyyy-MM-dd hh:mm:ss')
Date.prototype.format = function(format) {
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

//时间戳过滤器
Vue.filter('dateMin', (value) => {
    if (value) {
        // 兼容Safari Safari内核无法识别 -new Date()
        let newVal = '';
        if (typeof value != 'number') {
            newVal = value.replace(/-/g, '/');
        } else {
            newVal = value;
        }
        return new Date(newVal).format('yyyy-MM-dd hh:mm')
    } else {
        return "-"
    }
});
  
Vue.filter('dateD', (value) => {
    if (value) {
        let newVal = '';
        if (typeof value != 'number') {
            newVal = value.replace(/-/g, '/');
        } else {
            newVal = value;
        }
        return new Date(newVal).format('yyyy-MM-dd')
    } else {
        return "-"
    }
});

Vue.filter('timeFormat', (value, type) => {
    if (value) {
        return new Date(value).format(type)
    } else {
        return "-"
    }
});
  
Vue.filter('minute', (value, type) => {
    if (value) {
        return (value / 60).toFixed(2);
    } else {
        return 0
    }
});