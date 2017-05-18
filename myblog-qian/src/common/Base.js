export default {
    data() {
        return {
            list: [],
            self: this,
            ids: [],
            filter: {
                limit: 5,
                page: 1,
                name: '',
                total: 0
            },
            modal1: false,
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {

                if (valid) {
                    var _this = this;
                    var subUrl = "";
                    var method = "";

                    if (_this.formValidate._id != null) {

                        subUrl = `http://localhost:3000/${_this.model}/data/` + _this.formValidate._id;
                        method = "PUT";
                    } else {
                        console.log(_this.formValidate._id);
                        subUrl = `http://localhost:3000/${_this.model}/data/`;
                        method = "POST"
                    }


                    //  _this.formValidate.pwd =  待会加密

                    this.$http({
                        method: method,
                        url: subUrl,
                        data: _this.formValidate
                    }).then(function(res) {
                        _this.modal1 = false;
                        _this.$Message.success('提交成功');
                        console.log(_this.$options.data().formValidate, 285);
                        Object.assign(_this.$data.formValidate, _this.$options.data().formValidate)
                            //少一句跟新-------------
                        console.log("成功了");
                        _this.getData();
                    })

                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        getData() {
            var _this = this;
            console.log(_this.filter, 270);
            this.$http.post(`http://localhost:3000/${_this.model}/list`, _this.filter).then(function(result) {
                    console.log(result, 281);
                    if ('docs' in result.data) {
                        console.log(_this.list, 286);
                        _this.list = result.data.docs;
                        _this.filter.total = result.data.total;

                    }
                })
                .catch(function(err) {
                    console.log(error);
                })
        },
        changePage(page) {
            this.filter.page = page;
            this.getData();
        },
        handleSelectChange(select) {
            var _this = this;
            if (select.length > 0) {
                console.log(select, 289);
                var ids = [];
                let selection = select.length;
                for (var i = 0; i < selection; i++) {
                    ids.push(select[i]._id);
                }
                _this.ids = ids;
            }

        },
        removes() {
            var _this = this;
            if (_this.ids.length > 0) {
                _this.$Modal.confirm({
                    title: '警告',
                    content: '确认删除?',
                    onOk: () => {
                        _this.$http.post(`http://localhost:3000${_this.model}/removes`, { ids: _this.ids }).then(function(res) {
                            _this.getData();
                            _this.$Message.info("删除成功");

                        })
                    },
                    onCancel: () => {
                        _this.$Message.info('取消删除');
                    }

                })
            }
        },
        update(index) {
            var _this = this;
            _this.modal1 = true;
            var dataObj = Object.assign({}, _this.list[index]);
            _this.formValidate = dataObj;
        },
        remove(index) {
            var _this = this;
            var id = _this.list[index]._id;

            _this.$Modal.confirm({
                title: "警告",
                content: "确认删除？",
                onOk: () => {
                    _this.$http.delete(`http://localhost:3000/${_this.model}/` + id).then(function(res) {
                        _this.getData();
                        _this.$Message.info('删除成功');
                    })

                },
                onCancel: () => {
                    _this.$Message.info('取消删除');
                }
            })
        }

    },
    created() {
        this.getData();
    }
}