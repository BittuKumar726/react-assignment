import React, { useEffect, useState } from "react"
import { PageHeader } from '@ant-design/pro-layout';
import { Avatar, Col, Row, Table, Card, Button, Form, Input, Drawer } from 'antd';
const UserPage = () => {
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const response = await fetch('https://reqres.in/api/users')
        const userData = await response.json()
        setData(userData?.data)
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.first_name.length - b.first_name.length,
            },
            render: (text, record, index) => {
                return (
                    <Row gutter={10} type="flex" align="middle" key={index}>
                        <Col key={index}>
                            <Avatar
                                src={record.avatar}
                                style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                            >
                                {record.name}
                            </Avatar>
                        </Col>
                        <Col>
                            <span>{`${record.first_name} ${record.last_name}`}</span>
                        </Col>
                    </Row>
                );
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => a.email.length - b.email.length,
            },
        }
    ];

    const addUser = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }

    const onSubmit = async (values) => {
        setLoading(true)
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(
                { ...values }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((saveData) => {
                setData([...data, saveData])
                setVisible(false)
            })
            .catch((err) => {
                console.log(err.message);
            });
            
        setLoading(false)
    }

    return (<>
        <PageHeader
            title={
                "Ajmera infotech - Assignment"
            }
            style={{
                border: '1px solid rgb(235, 237, 240)',
                marginBottom: '1rem'
            }}
            extra={
                <Button type="primary" onClick={() => addUser()}>Add new user</Button>
            }
            subTitle="Coding Challange"
        />
        <Card title="User List" bordered={true} style={{
            border: '1px solid rgb(235, 237, 240)',
            margin: '1rem'
        }}>
            <Table key="user" bordered={true} columns={columns} dataSource={data} />
        </Card>

        <Drawer
            title="Create new user"
            width={720}
            onClose={onClose}
            open={visible}
            bodyStyle={{
                paddingBottom: 80,
            }}
            extra={
                ""
            }
        >
            <Form layout="vertical" form={form} onFinish={onSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter first name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter first name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter last name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter last name" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>

                        <Form.Item
                            name="avatar"
                            label="Avatar Url"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter photo url',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please enter url"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='email'
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </>
    )
}

export default UserPage;