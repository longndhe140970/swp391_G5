import { Card, Col, DatePicker, Row, Space, Statistic, Avatar, List, Tabs } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from "react";
import ManagerLayout from "../../layout/ManagerLayout/ManagerLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const { RangePicker } = DatePicker;

export const genRakingAccount = () => {
  let arrayLabel = [];
  for (let index = 1; index < 8; index++) {
    arrayLabel.push({ position: index, title: 'Ant Design Title 1' });
  }
  return arrayLabel;
};

const dataList = genRakingAccount()

export const genLabelMonths = () => {
  let arrayLabel = [];
  for (let index = 1; index < 13; index++) {
    arrayLabel.push({ label: index, month: index });
  }
  return arrayLabel;
};

export const genFakeData = () => {
  let arrayData = [];
  for (let index = 1; index < 13; index++) {
    arrayData.push({ month: index, price: index * 100 });
  }
  return arrayData;
};

export const genLabelBook = () => {
  let arrayLabel = [];
  for (let index = 1; index < 13; index++) {
    arrayLabel.push({ label: `book+${index}`, month: index });
  }
  return arrayLabel;
};

export const genFakeDataRanking = () => {
  let arrayData = [];
  for (let index = 1; index < 13; index++) {
    arrayData.push({ title: `book+${index}`, price: 2000 - index * 100 });
  }
  return arrayData;
};

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Doanh thu thang',
      font: {
        size: 20,
        weight: '700'
      },
      align: 'start',
      padding: 32
    },
    legend: {
      display: false
    },
  },
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      // display: false,
    },
    y: {
      stacked: true,
    },
  },
};

const dataFake = genFakeData();
const dataFakeRaking = genFakeDataRanking();

const labelsMonth = genLabelMonths();
const lablesBook = genLabelBook();

export const data = {
  labels: labelsMonth?.map((el) => el.label),
  datasets: [
    {
      label: '',
      data: labelsMonth.map((el) => {
        return dataFake?.find?.((ele) => ele?.month === el?.month)?.price;
      }),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export const dataRanking = {
  labels: lablesBook?.map((el) => el.label),
  datasets: [
    {
      label: '',
      data: lablesBook.map((el) => {
        return dataFakeRaking?.find?.((ele) => ele?.title === el?.label)?.price;
      }),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};


const DashBoardPage = () => {
  const [selectedTab, setSelectedTab] = useState(1);


  return (<>
    <ManagerLayout>
      <div className="flex flex-col content-center max-w-full bg-slate-200">
        <Row gutter={16} className="flex flex-row justify-between p-2 flex-nowrap">
          <Col span={4}>
            <Card bordered={true}>
              <Statistic
                title="Tong doanh thu"
                value={11.28}
                precision={2}
                valueStyle={{
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false}>
              <Statistic
                title="Tong account moi"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false}>
              <Statistic
                title="Tong don hang"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={false}>
              <Statistic
                title="Tong loi nhuan"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <div className=" max-h-[60%] flex-col flex bg-white m-2">
          <div className=" max-h-[30%] flex justify-between p-5 border-b-2">
            <div className="flex flex-row">
              <div className={`pr-5 text-xl font-bold cursor-pointer ${selectedTab === 1 ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setSelectedTab(1)}>Doanh thu</div>
              <div className={`text-xl font-bold cursor-pointer ${selectedTab === 2 ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setSelectedTab(2)}>Xep hang sach</div>
            </div>

            <div><Space direction="vertical" size={12}><RangePicker /></Space></div>
          </div>
          <div className="flex flex-row">
            <div className="min-w-[70%] pl-5">
              {selectedTab === 1 ? (<Bar options={options}
                data={data} />) : (<Bar options={options}
                  data={dataRanking} />)}
            </div>
            <div className="flex flex-col min-w-[30%] p-8">
              <h3 className="pb-8 text-xl font-bold">Xep hang tai khoan</h3>
              <List
                itemLayout="horizontal"
                dataSource={dataList}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div className="flex flex-row justify-between">
                          <span className="w-6 h-6 text-center text-white bg-gray-500 rounded-full">{item.position}</span>
                          <a href="https://ant.design">{item.title}</a>
                          <p>1000000</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </ManagerLayout>
  </>);
}

export default DashBoardPage;