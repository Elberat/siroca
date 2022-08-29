import React, { useEffect, useState } from 'react';
import { Empty, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IData } from '../types/data';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';

function TableComponent() {
    const { error, loading, dataObjects, count } = useTypedSelector(state => state.data);
    const { fetchData } = useActions();
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [search, setSeach] = useState<string>('');
    const [sortByCode, setSortByCode] = useState<string>('asc');
    const [sortByResearch, setSortByResearch] = useState<string>('asc');

    useEffect(() => {
        fetchData(page, size, search, sortByResearch, sortByCode);
    }, [page, search, sortByResearch, sortByCode]);

    const columns: ColumnsType<IData> = [
        {
            title: (
                <div onClick={() => setSortByCode(sortByCode === 'asc' ? 'desc' : 'asc')}>
                    Код {sortByCode === 'asc' ? <UpOutlined /> : <DownOutlined />}
                </div>
            ),
            dataIndex: 'code',
            width: 150,
            render: code => <strong>{code}</strong>,
        },
        {
            title: (
                <div onClick={() => setSortByResearch(sortByResearch === 'asc' ? 'desc' : 'asc')}>
                    Исследование {sortByResearch === 'asc' ? <UpOutlined /> : <DownOutlined />}
                </div>
            ),
            dataIndex: 'name',
            width: 700,
        },
        {
            title: 'Биоматериал',
            dataIndex: 'biomaterialName',
        },
        {
            title: 'Тип усл.',
            dataIndex: 'researchName',
        },
    ];

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
                rowKey={record => record.code}
                loading={loading}
                bordered={true}
                pagination={{
                    pageSize: size,
                    position: ['bottomCenter'],
                    total: count,
                    defaultPageSize: size,
                    showSizeChanger: false,
                    onChange: e => setPage(e),
                }}
            />
        </>
    );
}

export default TableComponent;
