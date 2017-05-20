<template>
<div>
    <div class="layout-breadcrumb">
        <Breadcrumb>
            <Breadcrumb-item href="#"><router-link to="/" active-class="active" exact>首页</router-link></Breadcrumb-item>
            <Breadcrumb-item href="#"><router-link to="/blog" active-class="active" exact>Ecahrt列表</router-link></Breadcrumb-item>       
        </Breadcrumb>
    </div>
    <div class="echarts">
        <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
     
        <button @click="doRandom">Random</button>
    </div>
</div> 
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import markPoint from 'vue-echarts-v3/src/full.vue';
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
      }
    }),
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.bar.series[0].data = data;
      },
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      }
    }
  };

</script>
<style scoped>
  .echarts {
    width: 400px;
    height: 400px;
  }
</style>
