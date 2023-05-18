import * as echarts from '../../comment/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [15, 23, 22, 18, 15],
        type: 'line'
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  opentable:function(e){
    wx.navigateTo({
      url:'../table/table'
    })
  },
  opendata:function(e){
    wx.navigateTo({
      url:'../data/data'
    })
  },
  onReady() {
  }
});
