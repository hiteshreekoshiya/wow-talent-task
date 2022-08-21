import React from 'react'
import { Table } from 'antd'
import Spinner from '../Spinner'

export default function ListTable({
  loading,
  tableColumnLayout,
  listSourceLayout,
  defaultPageSize,
  showSizeChanger,
  pageSizeOptions,
}) {
  return (
    <>
      {!loading && <Spinner size={'large'} />}
      {loading && (
        <div className="table-responsive">
          <Table
            columns={tableColumnLayout}
            dataSource={listSourceLayout}
            sortDirections={'ascend'}
            rowKey="key"
            pagination={{
              defaultPageSize: defaultPageSize,
              showSizeChanger: showSizeChanger,
              pageSizeOptions: pageSizeOptions,
            }}
          />
        </div>
      )}
    </>
  )
}
