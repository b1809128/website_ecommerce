import Chart from "../../components/chart/Chart";
import { chartData } from "../../components/chart/chartData";

//TODO: chart
// console.log(chartData.map(data => data))
var dataSet = chartData.map((data) => data);
<div className="admin__row">
  <div className="admin__col-6">
    <div className="admin__item-sm">
      <Chart
        title={dataSet[0].title}
        color={dataSet[0].color}
        data={dataSet[0].data}
      />
    </div>
    <div className="admin__item-sm">
      <Chart
        title={dataSet[1].title}
        color={dataSet[1].color}
        data={dataSet[1].data}
      />
    </div>
    <div className="admin__item-sm">
      <Chart
        title={dataSet[2].title}
        color={dataSet[2].color}
        data={dataSet[2].data}
      />
    </div>
    <div className="admin__item-sm">
      <Chart
        title={dataSet[3].title}
        color={dataSet[3].color}
        data={dataSet[3].data}
      />
    </div>
  </div>
  <div className="admin__col-4">
    <div className="admin__item-lg">
      <Chart
        title={dataSet[4].title}
        color={dataSet[4].color}
        data={dataSet[4].data}
      />
      <Chart
        title={dataSet[5].title}
        color={dataSet[5].color}
        data={dataSet[5].data}
      />
    </div>
  </div>
</div>;
