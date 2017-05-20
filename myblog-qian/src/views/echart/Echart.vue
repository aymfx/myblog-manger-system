<template>
<div>
    <div class="layout-breadcrumb">
        <Breadcrumb>
            <Breadcrumb-item href="#"><router-link to="/" active-class="active" exact>首页</router-link></Breadcrumb-item>
            <Breadcrumb-item href="#"><router-link to="/blog" active-class="active" exact>Ecahrt列表</router-link></Breadcrumb-item>       
        </Breadcrumb>
    </div>
    <div style="overflow:hidden">
       <div class="echarts">
            <IEcharts :option="line" ></IEcharts>
        </div>
        <div class="echarts">
            <IEcharts :option="bar" ></IEcharts>
        </div>
        <div class="echarts">
            <IEcharts :option="pie" ></IEcharts>
        </div>
        <div class="echarts">
            <IEcharts :option="pie_radius" ></IEcharts>
        </div>
    </div>
       
</div> 
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
   
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    data: () => ({
      loading: false,
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
       line: {
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
                title: {
                    text: '曲线图'
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis:{},
                series: [
                    {
                        name: "销量",
                        type: "line",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            },
            bar: {
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
                title: {
                    text: '柱状图'
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis:{},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            },
            pie: {
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
                title : {
                    text: '饼状图',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
                },
                series : [
                    {
                        name: '销量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'衬衫'},
                            {value:310, name:'羊毛衫'},
                            {value:234, name:'雪纺衫'},
                            {value:135, name:'裤子'},
                            {value:548, name:'高跟鞋'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            pie_radius:{
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
                title : {
                    text: '环形图',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
                },
                series : [
                    {
                        name: '销量',
                        type: 'pie',
                        radius : ['40%','60%'],
                        data:[
                            {value:335, name:'衬衫'},
                            {value:310, name:'羊毛衫'},
                            {value:234, name:'雪纺衫'},
                            {value:135, name:'裤子'},
                            {value:548, name:'高跟鞋'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        
    })
  };

</script>
<style scoped>
  .echarts {
        float: left;
        width: 500px;
        height: 280px;
    }
</style>
