import React, { FC, useEffect, useState } from 'react';
import { Empty, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IData } from '../types/data';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { SearchOutlined } from '@ant-design/icons';

const columns: ColumnsType<IData> = [
    {
        title: 'Код',
        dataIndex: 'code',
        width: 150,

        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
    {
        title: 'Исследование',
        dataIndex: 'name',
        width: 700,
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
    {
        title: 'Биоматериал',
        dataIndex: 'biomaterialName',
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
    {
        title: 'Тип усл.',
        dataIndex: 'researchName',
    },
    {
        title: 'price',
        dataIndex: 'price',
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
];

function TableComponent() {
    const { error, loading, dataObjects, count } = useTypedSelector(state => state.data);
    const { fetchData } = useActions();
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [search, setSeach] = useState<string>('');

    useEffect(() => {
        fetchData(page, size, search);
    }, [page, search]);

    if (error) return <Empty />;

    return (
        <>
            <Input
                style={{ margin: ' 15px auto', width: '20vw', display: 'flex' }}
                placeholder='Поиск по коду'
                prefix={<SearchOutlined />}
                bordered
                size={'middle'}
                value={search}
                onChange={e => setSeach(e.target.value)}
                allowClear={true}
            />
            <Table
                style={{ padding: '15px' }}
                columns={columns}
                dataSource={dataObjects}
                rowKey={record => record.name}
                loading={loading}
                bordered
                pagination={{
                    pageSize: size,
                    position: ['bottomCenter'],
                    total: count,
                    defaultPageSize: size,
                    showSizeChanger: false,
                    onChange: e => setPage(e),
                }}
                // onHeaderRow={(columns, index) => {
                //     return {
                //         onClick: () => {
                //             console.log(index, columns);
                //         }, // click header row
                //     };
                // }}

                onHeaderCell={(columns, index) => {
                    return {
                        onClick: () => {
                            console.log(columns, index);
                        },
                    };
                }}
            />
        </>
    );
}

export default TableComponent;
