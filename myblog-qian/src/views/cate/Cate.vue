<template>
    <div>
         <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item>分类</Breadcrumb-item>
            </Breadcrumb>
        </div>

        <Button-group>
            <Button @click="changeType(1)" :class="{ active: formValidate.type === 1 }">日志分类</Button>
            <Button @click="changeType(2)" :class="{ active: formValidate.type === 2 }">相册分类</Button>
            <Button @click="changeType(3)" :class="{ active: formValidate.type === 3 }">上传分类</Button>
        </Button-group>

       <Tree :data="baseData" @on-select-change="selectChange"></Tree>

       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

        <span v-if="currentNodeTitle == null">
            你将要添加根节点
        </span>
        <span v-else>
            你将添加 {{ currentNodeTitle }} 的子节点
        </span>

            <Form-item label="分类名称" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入分类名称"></Input>
            </Form-item>
            

            <Button type="primary" @click="addRootNode">添加根节点</Button>
            <Button type="primary" @click="editNode">修改节点</Button>
            <Button type="primary" @click="remove">删除节点</Button>
            
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
        </Form>

    </div>
</template>


<script>
    export default{

        data(){
            return {
                _id:null,
                formValidate:{
                    _id:null,
                    type:1,
                    title:'',
                    parentId:null,
                    currentParentId:null
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ],
                },
                baseData:[],
                currentNodeTitle:''
            }
        },
        methods: {
            changeType(type){
                this.getTreeData(type);
                this.formValidate.type = type;
            },
            getTreeData(type){
                var _this = this;
                _this.$http.get(`http://localhost:3000/cate/${type}`).then(res=>{
                    _this.baseData = res.data;
                })
            },
            selectChange(node){
                console.log(node)
                this._id = node[0]._id;
                this.formValidate.parentId = node[0]._id; // 表单提交里的parentId等于节点的_id
                this.formValidate.currentParentId = node[0].parentId; //当前的parentId就是它的节点的parentId
                this.currentNodeTitle = node[0].title;
              
            },
            handleSubmit(name){
                var _this = this;
                var submitUrl,submitMethod;

                if(_this.formValidate._id !=null){
                    submitUrl = `http://localhost:3000/cate/data/` + _this.formValidate._id;
                    submitMethod = 'PUT';
                }else{
                    submitUrl = `http://localhost:3000/cate/data`;
                    submitMethod = 'POST'; 
                }

                 this.$refs[name].validate((valid) => {
                     if(valid){
                         _this.$http({
                             url:submitUrl,
                             method: submitMethod,
                             data: _this.formValidate
                         })
                         .then(function(response){
                            _this.$Message.success('提交成功');
                            _this.getTreeData(_this.formValidate.type);

                            var type = _this.formValidate.type;
                            Object.assign(_this.$data.formValidate, _this.$options.data().formValidate);
                            _this.formValidate.type = type;
                         })
                     }else{
                         this.$Message.error('表单验证失败');
                     }
                 })
            },
            addRootNode(){
                this.formValidate._id = null;
                this.formValidate.parentId = null;
            },
            editNode(){
              
                this.formValidate._id = this._id;
                this.formValidate.parentId = this.formValidate.currentParentId;

            },
            handleReset(name){
                this.$refs[name].resetFields();
            },
            remove(){
                var _this = this;
                _this.$http.delete(`http://localhost:3000/cate/${_this._id}`).then(res=>{
                    _this.getTreeData(_this.formValidate.type);
                    var type = _this.formValidate.type;
                    Object.assign(_this.$data, _this.$options.data());
                    _this.formValidate.type = type;
                })
            }
        },
        created () {
            this.getTreeData(1);
        }
    }
</script>