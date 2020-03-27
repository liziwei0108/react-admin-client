
    
## 1. 启动项目开发

## 2. git管理项目
        
## 3. 创建项目的基本结构
    api: ajax请求的模块
    components: 非路由组件
    pages: 路由组件
    App.js: 应用的根组件
    index.js: 入口js
    
## 4 引入antd
        
## 5. 引入路由
      
## 6. Login的静态组件
    1). 自定义了一部分样式布局
    2). 使用antd的组件实现登陆表单界面
      Form  / Form.Item
      Input
      Icon
      Button

## 7. 收集表单数据和表单的前台验证
    1). form对象
        如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)//高阶组件
        WrapLoginForm是LoginForm的父组件, 它给LoginForm传入form属性
    2). 操作表单数据
        form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)包装表单项组件标签
        form.getFieldsValue(): 得到包含所有输入数据的对象
        form.getFieldValue(id): 根据标识得到对应字段输入的数据
    
    3). 前台表单验证
        a. 声明式实时表单验证:
            form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
        b. 自定义表单验证
            form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
            validatePwd = (rule, value, callback) => {
              if(有问题) callback('错误提示信息') else callack()
            } 
        c. 点击提示时统一验证
            form.validateFields((error, values) => {
              if(!error) {通过了验证, 发送ajax请求}
            })
            
        
## 8. 编写ajax代码
    1). ajax请求函数模块: api/ajax.js
        封装axios + Promise
        函数的返回值是promise对象  ===> 后面用上async/await
        优化：自己创建Promise
          1. 内部统一处理请求异常: 外部的调用都不用使用try..catch来处理请求异常
          2. 异步返回是响应数据(而不是响应对象): 外部的调用异步得到的就直接是数据了(response --> response.data)
    2). 接口请求函数模块: api/index.js
        根据接口文档编写(一定要具备这个能力)
        接口请求函数: 使用ajax(), 返回值promise对象
    3). 解决ajax跨域请求问题(开发时)
        办法: 配置代理  ==> 只能解决开发环境
        编码: package.json: proxy: "http://localhost:5000"
    4). async和await
        a. 作用?
           简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
           以同步编码(没有回调函数了)方式实现异步流程
        b. 哪里写await?
            在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
        c. 哪里写async?
            await所在函数(最近的)定义的左侧写async
            
## 9. 实现登陆
    login.jsx
        1). 调用登陆的接口请求
        2). 如果失败, 显示错误提示信息
        3). 如果成功了:
            保存user到local/内存中
            跳转到admin
        4). 如果内存中的user有值, 自动跳转到admin
    src/index.js
        读取local中user到内存中保存
    admin.jsx
        判断如果内存中没有user(_id没有值), 自动跳转到login
    storageUtils.js
        包含使用localStorage来保存user相关操作的工具模块
    memoryUtils.js
        用来在内存中保存数据(user)的工具类
	//后期是通过redux来存储用户数据的
        
## 10. 搭建admin的整体界面结构
    1). 整体布局使用antd的Layout组件
    2). 拆分组件
        LeftNav: 左侧导航
        Header: 右侧头部
    3). 子路由
        定义路由组件
        注册路由
        
## 11. LeftNav组件
    1). 使用antd的组件
        Menu / Item / SubMenu
    
    2). 使用react-router
        withRouter(): 包装非路由组件, 给其传入history/location/match属性
        history: push()/replace()/goBack()
        location: pathname属性
        match: params属性

## 12. Header组件
    1). 界面静态布局
    2). 天气预报
        使用jsonp库发jsonp请求百度天气预报接口
    3). 当前导航项的标题
        得到当前请求的路由path: withRouter()包装非路由组件
        根据path在menuList中遍历查找对应的item的title
    4). 退出登陆
        Modal组件显示提示
        清除保存的user
        跳转到login
        
## 13. jsonp解决跨域
    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求不是ajax请求, 而是一般的get请求
    3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据

## 14. 使用antd组件构建分类列表界面
    Card
    Table
    Button
    Icon
        
## 15. 相关接口请求函数
    获取一级/二级分类列表
    添加分类
    更新分类
        
## 16. 异步显示一级分类列表    
    设计一级分类列表的状态: categorys
    异步获取一级分类列表: componentDidMount(){}
    更新状态, 显示

## 17. 显示二级分类列表
    设计状态: subCategorys / parentId / parentName
    显示二级分类列表: 根据parentId状态值, 异步获取分类列表
    setState()的问题
        setState()更新状态是异步更新的, 直接读取状态值还是旧的状态值
        setState({}, [callback]), 回调函数是在状态更新且界面更新之后执行, 可以在此获取最新的状态
        
## 18. 更新分类
    1). 界面
        antd组件: Modal, Form, Input
        显示/隐藏: showStatus状态为2/0
        
    2). 功能
        父组(Category)件得到子组件(AddForm)的数据(form)
        调用更新分类的接口
        重新获取分类列表
        

## 19. 添加分类
    1). 界面
        antd组件: Modal, Form, Select, Input
        显示/隐藏: showStatus状态为1/0
        
    2). 功能
        父组(Category)件得到子组件(AddForm)的数据(form)
        调用添加分类的接口
        重新获取分类列表

## 20. 角色管理
    1). 角色前台分页显示
    2). 添加角色
    3). 给指定角色授权
        界面: Tree
        状态: checkedKeys, 根据传入的role的menus进行初始化
        勾选某个Node时, 更新checkedKeys
        点击OK时: 通过ref读取到子组件中的checkedKeys作为要更新product新的menus
                发请求更新product
        解决默认勾选不正常的bug: 利用组件的componentWillReceiveProps()
	//后期修改为getDerivedStateFromProps并改为完全受控组件

## 21. 用户管理
    1). 显示用户分页列表
    2). 添加用户
    3). 修改用户
    4). 删除用户
    
## 22. 导航菜单权限控制
    1). 基本思路(依赖于后台): 
        角色: 包含所拥有权限的所有菜单项key的数组: menus=[key1, key2, key3]
        用户: 包含所属角色的ID: role_id
        当前登陆用户: user中已经包含了所属role对象
        遍历显示菜单项时: 判断只有当有对应的权限才显示
    2). 判断是否有权限的条件?
        a. 如果当前用户是admin
        b. 如果当前item是公开的
        c. 当前用户有此item的权限: key有没有menus中
        d. 如果当前用户有此item的某个子item的权限
	//应该是由后台来控制权限，前端这边辅助控制

    
