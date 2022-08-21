import React, { useEffect, useState } from 'react'
import { Table, Typography, Select, DatePicker, Space, Row, Col } from 'antd'
import {
  DownloadOutlined,
  DownOutlined,
  SyncOutlined,
  AntDesignOutlined,
  UserOutlined,
  StopOutlined,
  AndroidOutlined,
  AppleOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'

const Home = () => {
  const { Text } = Typography
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState('2022-06-01')
  const [endDate, setEndDate] = useState('2022-07-01')
  const [activeInstall, setActiveInstall] = useState('')
  const [activeUsers, setActiveUsers] = useState('')
  const [activeChurn, setActiveChurn] = useState('')
  const [churn, setChurn] = useState('')
  const [totalInstall, setTotalInstall] = useState('')
  const [totalUnInstall, setTotalUnInstall] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [listData, setListData] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${startDate}&todate=${endDate}`,
      )
      .then((res) => {
        console.log('res...', res)
        setListData(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(
        `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=${startDate}&todate=${endDate}`,
      )
      .then((res) => {
        setActiveInstall(res.data.data.activeinstall)
        setActiveUsers(res.data.data.aliveappusers)
        setActiveChurn(res.data.data.alivechurn)
        setChurn(res.data.data.churn)
        setTotalInstall(res.data.data.totalInstall)
        setTotalUnInstall(res.data.data.totaluninstall)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [startDate, endDate])

  const tableColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sortDirections: ['ascend', 'descend'],
      //   sorter: (a, b) => a.date?.localeCompare(b.date),
    },
    {
      title: 'Day Installs',
      dataIndex: 'day_installs',
      key: 'day_installs',
      sortDirections: ['ascend', 'descend'],
      //   sorter: (a, b) => a.day_installs?.localeCompare(b.day_installs),
    },
    {
      title: 'Plateform',
      dataIndex: 'plateform',
      key: 'plateform',
      //   sorter: (a, b) => a.plateform?.localeCompare(b.plateform),
    },
    {
      title: 'Day Uninstalls',
      dataIndex: 'day_uninstalls',
      key: 'day_uninstalls',
      //   sorter: (a, b) => a.day_uninstalls?.localeCompare(b.day_uninstalls),
    },
    {
      title: 'Plateform',
      dataIndex: 'plateform2',
      key: 'plateform2',
      sortDirections: ['ascend', 'descend'],
      //   sorter: (a, b) =>
      //     a.plateform2?.localeCompare(b.plateform2),
    },
    {
      title: 'Churn Rate',
      dataIndex: 'churn_rate',
      key: 'churn_rate',
      sortDirections: ['ascend', 'descend'],
      //   sorter: (a, b) => a.churn_rate?.localeCompare(b.churn_rate),
    },
    {
      title: 'Churn Plateform',
      dataIndex: 'churn_plateform',
      key: 'churn_plateform',
      sortDirections: ['ascend', 'descend'],
      //   sorter: (a, b) => a.churn_plateform?.localeCompare(b.churn_plateform),
    },
  ]

  const list = (listData || []).map((data, index) => {
    return {
      key: index,
      date: moment(data.created_At).format('DD MMM YYYY'),
      day_installs: data.totalinstall,
      plateform: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AndroidOutlined
              style={{ marginBottom: '5px', marginRight: '5px' }}
            />
            <span>{data.android_install}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AppleOutlined
              style={{ marginBottom: '5px', marginRight: '5px' }}
            />
            <span>{data.ios_install}</span>
          </div>
        </div>
      ),
      day_uninstalls: data.totaluninstall,
      plateform2: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AndroidOutlined
              style={{ marginBottom: '5px', marginRight: '5px' }}
            />
            <span>{data.android_uninstall}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AppleOutlined
              style={{ marginBottom: '5px', marginRight: '5px' }}
            />
            <span>{data.ios_uninstall}</span>
          </div>
        </div>
      ),
      churn_rate: `${data.totalchurn}%`,
      churn_plateform: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AndroidOutlined
              style={{ marginBottom: '5px', marginRight: '5px' }}
            />
            <span>{data.android_churn}%</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AppleOutlined
              style={{ marginBottom: '5px', marginRight: '5px' }}
            />
            <span>{data.ios_churn}%</span>
          </div>
        </div>
      ),
    }
  })

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const onChange = (value) => {
    setStartDate(formatDate(value[0]?.toDate()))
    setEndDate(formatDate(value[1]?.toDate()))
  }

  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          // height: '238px',
          background: '#283046',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '27px',
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className="gutter-row"
            md={8}
            sm={12}
            xs={12}
            lg={8}
            xl={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '25px',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  height: '63px',
                  width: '63px',
                  border: '1px solid #707070',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                  marginLeft: -7,
                }}
              >
                <DownloadOutlined
                  style={{
                    fontSize: '28px',
                    color: 'black',
                    marginTop: '16px',
                    marginLeft: '16px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  marginLeft: '25px',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {totalInstall}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  App Installed
                </Text>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  height: '63px',
                  width: '63px',
                  border: '1px solid #707070',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <StopOutlined
                  style={{
                    fontSize: '28px',
                    color: 'black',
                    marginTop: '16px',
                    marginLeft: '16px',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  marginLeft: '25px',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {totalUnInstall}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  App Un-Installed
                </Text>
              </div>
            </div>
          </Col>

          <Col
            className="gutter-row"
            md={8}
            sm={12}
            xs={12}
            lg={8}
            xl={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '25px',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  height: '63px',
                  width: '63px',
                  border: '1px solid #707070',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <DownOutlined
                  style={{
                    fontSize: '28px',
                    color: 'black',
                    marginTop: '16px',
                    marginLeft: '16px',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  marginLeft: '25px',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {activeInstall}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  Active Installs
                </Text>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  height: '63px',
                  width: '63px',
                  border: '1px solid #707070',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <UserOutlined
                  style={{
                    fontSize: '28px',
                    color: 'black',
                    marginTop: '16px',
                    marginLeft: '16px',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  marginLeft: '25px',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {activeUsers}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  Alive Apps users
                </Text>
              </div>
            </div>
          </Col>

          <Col
            className="gutter-row"
            md={8}
            sm={12}
            xs={12}
            lg={8}
            xl={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '25px',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  height: '63px',
                  width: '63px',
                  border: '1px solid #707070',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <SyncOutlined
                  style={{
                    fontSize: '28px',
                    color: 'black',
                    marginTop: '16px',
                    marginLeft: '16px',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  marginLeft: '25px',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {churn}%
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  Churn Rate
                </Text>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  height: '63px',
                  width: '63px',
                  border: '1px solid #707070',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <AntDesignOutlined
                  style={{
                    fontSize: '28px',
                    color: 'black',
                    marginTop: '16px',
                    marginLeft: '16px',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  marginLeft: '25px',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {activeChurn}%
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  Alive Churn Rate
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          className="gutter-row"
          md={12}
          sm={24}
          xs={24}
          lg={12}
          xl={12}
          style={{
            marginBottom: '20px',
          }}
        >
          <Text>Show</Text>

          <Select
            onChange={(val) => {
              setPageSize(val)
            }}
            style={{ width: '77px', marginLeft: '10px', marginRight: '10px' }}
            defaultValue={10}
          >
            <Option value="10">10</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
            <Option value="500">500</Option>
            <Option value="1000">1000</Option>
          </Select>

          <Text>Entries</Text>
        </Col>

        <Col
          className="gutter-row"
          md={12}
          sm={24}
          xs={24}
          lg={12}
          xl={12}
          style={{
            marginBottom: '20px',
            display:'flex',
            justifyContent:'flex-end'
          }}
        >
          <Space direction="vertical" size={6}>
            <RangePicker
              format="YYYY-MM-DD"
              onChange={(val) => onChange(val)}
            />
          </Space>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          sortDirections={'ascend'}
          rowKey="key"
          pagination={{
            pageSize: pageSize,
          }}
        />
      </div>
    </div>
  )
}

export default Home
