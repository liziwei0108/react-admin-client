import React, { Component } from 'react';
import { Card, Table, Button, Icon, message, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

/**
 * 商品分类
 */

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,   //是否正在获取数据
      categorys: [],    //一级分类列表
      subCategorys: [], //二级分类列表
      parentId: '0',    //当前需要显示的父分类列表的id
      parentName: '',   //当前需要显示的父分类列表的名称
      showStatus: 0,    //标识添加/更新的确认框是否显示 0:都不显示 1:显示添加分类的确认框 2:显示更新分类的确认框
    };

    this.columns = [
      {
        title: '分类名',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 400,
        render: (category) => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
              {
                this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
              }
            </span>
          )
        }
      },
    ];
  }

  //显示一级分类列表
  showCategorys = () => {
    this.setState({
      subCategorys: [], //二级分类列表清空
      parentId: '0',    //当前需要显示的父分类列表的id改为0，表示当前是一级分类列表
      parentName: '',   //当前需要显示的父分类列表的名称改为空串
    })

  }

  //显示二级分类列表
  showSubCategorys = (category) => {
    //更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name,
    });

    //调用函数获取二级分类列表
    this.getCategorys(category._id);

  }

  //异步获取分类列表
  getCategorys = async (parentId) => {
    //在发请求前将loading置为true
    this.setState({loading: true});
    const response = await reqCategorys(parentId);
    //在发请求后将loading置为false
    this.setState({ loading: false });
    console.log(response)
    if (response.status === 0) {
      const categorys = response.data;
      if(parentId===0){
        //如果父分类列表id为0，表示当前列表是一级列表
        this.setState({ categorys })
      } else {
        //如果父分类列表不为0，表示当前列表是二级列表
        this.setState({ subCategorys: categorys })
      }
      
    } else {
      message.error("获取分类列表失败！")
    }
    

  }

  /**
   * 执行异步任务（发异步ajax请求）
   */
  componentDidMount() {
    //获取一级分类列表
    this.getCategorys('0')
  }

  //显示添加分类弹窗
  showAdd = () => {
    this.setState({
      showStatus: 1,
    })
  }

  //显示修改分类弹窗
  showUpdate = (category) => {
    //保存指定要修改的分类
    this.category = category
    console.log(category);
    debugger;

    this.setState({
      showStatus: 2,
    })
  }
  //添加分类
  addCategory = () => {
    console.log('addCategory')
  }

  //更新分类
  updateCategory = async () => {
    console.log('updateCategory')
    //隐藏确认框
    this.setState({
      showStatus: 0,
    })

    const categoryId = this.category._id;
    const categoryName = this.form.getFieldValue('categoryName');

    //重置表单中的所有数据
    this.form.resetFields();

    //发请求更新分类
    const result = await reqUpdateCategory(categoryId, categoryName);
    if(result.status===0){
      //请求成功
      //重新显示列表
    this.getCategorys('0');
    }else{

    }

    
  }

  //取消弹窗
  handleCancel = () => {

    //清除数据
    this.form.resetFields();
    //隐藏确认框
    this.setState({
      showStatus: 0,
    })
  }

  render() {
    //读取状态中的值
    const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state;
    const columns = this.columns;
    const category = this.category || {};    //category在点击了修改按钮后才会更新，所以第一次render时category为空，此时需要给他赋一个空对象

    //card的左侧标题
    const title = parentId==='0' ? '一级分类列表' :(
      <span>
        <LinkButton onClick={this.showCategorys}>
          一级分类列表
        </LinkButton>
        <Icon type="arrow-right" style={{marginRight:5}}/>
        <span>{parentName}</span>     
      </span>
    );

    //card的右侧button
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>

    )

    return (
      <Card title={title} extra={extra}>
        <Table bordered rowKey='_id' 
        dataSource={parentId==='0' ? categorys : subCategorys} 
        columns={columns} 
        pagination={{defaultPageSize: 5, showQuickJumper: true}} 
        loading={loading}/>

        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm />
        </Modal>

        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category.name} setForm={(form)=>{this.form=form}}/>   
        </Modal>
      </Card>
    )
  }
}