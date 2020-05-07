;
(function ($) {

    var baseParams = {
        ids: null,
        params: null,
        imageUrl: "",
        bigImageUrl: "",
        uploadFileUrl: "",
        uploadToUrl: "",
        uploadName: "upfile",
        redirectUrl: "",
        submitName: "",
        multiImages: false,
        perRender:true,
        fileContianer:null,
        fileRenderUrl:null,
        show: true,
        muti:false,
        fileExtArr:null,
        fileExtStr:null,
        autoInit:true,
        timeout:60,
        max:null //最多上传图片个数
    };
    var FileUploder = function (dom,initParams) {
        this.initParams(dom,initParams);
        this.initDom(dom);
        this.proxy(["on","bind","click","trigger"]);
        this.initEvents();
        if(this.ids){
            this.initValue(this.ids);
        }
    };
    $.extend(FileUploder.prototype, {
        dom: null,
        input: null,
        iframe: null,
        initParams:function(dom,initParams){
            var dom$ =$(dom);
            var params = $.extend({},initParams);
            for(var paramkey in params){
                if(dom$ .data(paramkey.toLowerCase()) !== undefined ){
                    params[paramkey] = dom$ .data(paramkey.toLowerCase());
                }
            }
            $.extend(this,params);
        },
        initDom:function(dom){
            var uploader = this;
            var dom$ =$(dom);
            this.dom = dom$;
            dom$.attr("href","javascript:;");
            var date = new Date().getTime();
            //创建frame
            var frame = $('<iframe class="upload-frame"  class="ignore" name="frame'+date+'" src="'+url+'" style="display: none"></iframe>');
            var form = $('<form method="post"  style="display:inline" action="'+this.uploadToUrl+'" enctype="multipart/form-data" target="frame'+date+'"></form>')
            var redirectInput=$('<input type="hidden" name="redirectUrl" class="ignore" value="'+this.redirectUrl+'">');

            //增加图片名称
            this.pictureName=$('<input type="hidden" name="pictureName" class="ignore">');
            this.input = dom$.find("input:file");
            this.form = form;
            this.hiddenField = $('<input  class="ignore hiddenFileUp" name="'+this.input.attr('name')+'"  type="hidden" >' );
            this.input.attr("name",this.uploadName);
            dom$.parent().append(form).append(this.hiddenField);
            dom$.parent().append(form).append(this.pictureName);
            form.append(dom).append(redirectInput);
            this.hiddenField = dom$.parent().siblings('input');
            //当frame载入成功
            frame.load(function(){
                uploader.submitwin = frame.get(0).contentWindow;
                uploader.frame = frame;
            });
            $(document.body).append(frame);
            this.frame = frame;
            this.fileContianer = $(this.fileContianer);
            //多选组件
            if(this.muti) {
                if (!this.imgTemplate) {
                    var tmplateDom = this.fileContianer.children('.image-child');
                    this.imgTemplate = tmplateDom.get(0).outerHTML;
                    $(tmplateDom).each(function(){
                       var att = $(this).attr("image-init");
                       if(att!="true"){
                           tmplateDom.remove();
                       }
                    });
                }
            }
            if(this.fileExtStr){
                this.fileExtArr = this.fileExtStr.split(",");
            }
        },
        initEvents:function(){
            var uploader = this;
            var frame = this.frame;
            var form = this.form;
            //当上传文件变化的时候将数据上传到服务器
            uploader.bindInput = function(){
                $(this.input).bind("change",function(){
                    uploader.trigger("beforeUpload",function () {
                        uploader.showMask();
                        // console.log("开始上传");
                        console.log("Start to upload");
                        form.submit();
                        onWindowUnload();
                    })
                });
            }
            uploader.bindInput();
            //接收返回值
            frame.unload(function(){
                alert("2");
            });
            if(form.validate){
                form.validate({
                    ignore: ".ignore",
                    onsubmit:false
                });
            }
            form.submit(function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();
            });
            //多选的事件
            if(this.muti){
                this.fileContianer.on('click','.imgDel',function () {
                    // if(confirm("确定要删除此附件吗？")){
                    if(confirm("Are you sure you want to delete this attachment?")){

                        //资源上架使用imgOri-----专用
                        var imgOri = $(this).parent(".image-original");
                        if(imgOri.html()!=undefined){
                        	var img = $(this).parent(".image-child");
                            !img.get(0) && (img = $(this).parentsUntil(".image-child").parent());
                            uploader.removeId(img.data("id"));
                            img.remove();
                            return;
                        }

                        var img = $(this).parent(".image-child");
                        //1.1定位需要删除的值的坐标
                        var index = 0;
                        //1.2获取当前删除的文件href
                        var href = $(img).find("a").attr("href");
                        if(href==undefined){
                            href = $(img).attr("r_href");
                        }
                        //1.3从文件href中截取文件名
                        var file_name = href.substring(href.lastIndexOf("/"), href.length);

                        //2.1获取imgFile的值（文件路径字符串）
                        var arr_name = $("input[name=imgFile]").val().split(",");
                        //2.2初始化删除后的imgFile值
                        var value_imgFile = "";
                        for(var i=0; i<arr_name.length; i++){
                            if(arr_name[i].indexOf(file_name)>-1){
                                //2.3如果找到，记录坐标
                                index = i;
                            }else{
                                //2.4为删除后的imgFile重新拼接值
                                value_imgFile += arr_name[i]+",";
                            }
                        }
                        if(value_imgFile!=""){
                            value_imgFile = value_imgFile.substring(0, value_imgFile.length-1);
                        }
                        //2.5为imgFile赋值
                        $("input[name=imgFile]").val(value_imgFile);

                        //3.1获取pictureName的值（显示的文件名字符串）
                        var arr_pictureName = $("input[name=pictureName]").val().split(",");
                        //3.2初始化删除后的pictureName值
                        var value_pictureName = "";
                        for(var i=0; i<arr_pictureName.length; i++){
                            if(i!=index){
                                //3.3遍历数组，如果没到相应坐标，就将值拼接在pictureName
                                value_pictureName += arr_pictureName[i]+",";
                            }
                        }
                        if(value_pictureName!=""){
                            value_pictureName = value_pictureName.substring(0, value_pictureName.length-1);
                        }
                        //3.4为pictureName赋值
                        $("input[name=pictureName]").val(value_pictureName);

                        //!img.get(0) && (img = $(this).parentsUntil(".image-child").parent());
                        //uploader.removeId(img.data("id"));
                        //4.页面删除当前元素
                        img.remove();
                    }
                })
            }
            function onWindowUnload() {
                uploader.submitwin.onunload = function () {
                    var i = 1;
                    var a = setInterval(function () {

                        function reset() {
                            clearInterval(a);
                            var fileclone = uploader.input.clone("");
                            uploader.input.after(fileclone);
                            uploader.input.remove();
                            uploader.input=fileclone;
                            uploader.hideMask();
                            uploader.bindInput();
                            frame.get(0).src = url;

                        }
                        if(uploader.timeout == i){
                            // uploader.alert("上传失败，连接超时");
                            uploader.alert("Upload failed and connection timeout");
                            reset();
                        }
                        var winUrl = "";
                        try {
                            winUrl = uploader.submitwin.location ? uploader.submitwin.location.href : "";
                        } catch (e) {
                            return;
                        }
                        if (winUrl == url|| !winUrl) {
                            reset();
                        } else {
                            var result = uploader.parseResult(winUrl);
                            if(!!result.error && "0" != result.error && "{error}" != result.error){
                                // uploader.alert("上传文件最大不得超过" + result.error + "Bytes");
                                uploader.alert("Maximum upload file must not exceed" + result.error + "Bytes");
                            } else {
                                uploader.trigger("receive",result);
                                uploader.setValue(result);
                            }
                            reset();
                        }
                    }, 1000);
                };
            }
            uploader.on("beforeUpload",this.onBeforeUpload );
            uploader.on("receive",this.onReceive );
        },
        showMask:function(){
            if($.messager){
                $.messager.progress()
            }
            if(window.layer){
                this.mask = window.layer.msg('uploading..', {icon: 4,scrollbar: false,shade:.3,time:50000});
            }
        },
        hideMask:function(){
            if(window.layer) {
                window.layer.close(this.mask)
            }
            if($.messager){
                $.messager.progress("close")
            }
        },
        removeId:function(id){
            if(this.muti){
                var ids = this.hiddenField.val();
                var idsArr = ids.split(",");
                var index = idsArr.indexOf(id);
                idsArr.splice(index,1);
                this.hiddenField.val(idsArr.join(','));
            }
        },
        setValue:function(result){
            var path = result["path"];
            var pictureVal2 = $("input[name='pictureName']").val();
            var pictureVal= this.input[0].value;
            var uploader =this;
            $("#imgFile").val("");//清空inputFile，解决连续上传同一个文件失效的问题
            if(uploader.muti){
                var val = uploader.hiddenField.val();
                if(val!=''){
                    val += ',';
                }
                if(pictureVal2!=''){
                    pictureVal2 += ',';
                    pictureVal = pictureVal2+pictureVal;
                }
                val += path;

                uploader.hiddenField.val(val);
                uploader.pictureName.val(pictureVal);
            }else{
                uploader.hiddenField.val(path);
                uploader.pictureName.val(pictureVal);
            }
        },
        onBeforeUpload:function(e,callback){
            var filename = $(this).fileupload().input.val();
            $(this).fileupload().checkFileMax(filename) != false
            && $(this).fileupload().checkFileSize() != false
            && $(this).fileupload().checkFileExt(filename) != false
            && callback && callback(filename);
        },
        checkFileMax:function(filename){
            var uploader =this;
            var count = $("#count").val();
            if(!count){
                count = 0;
            }
            var total = parseInt($(uploader.fileContianer).find(".image-child").length)+parseInt(count);
            if(uploader.max != null && total >= uploader.max){
                // uploader.alert("超过上传限制，仅能上传"+uploader.max+"个文件");
                uploader.alert("Beyond upload limit，can only upload"+uploader.max+"files");
                $("#imgFile").val("");//清空inputFile，解决连续上传同一个文件失效的问题
                return false;
            }
        },
        checkFileSize:function(){
            var uploader =this;
            var input = this.input;
            var fileSize = input[0].files[0].size;
            if(fileSize == 0){
                // uploader.alert("不能上传0kb文件");
                uploader.alert("Cannot upload 0kb file");
                return false;
            }

            var size = fileSize / 1024 / 1024;
            if(size>4){
                // uploader.alert("上传文件最大不得超过4M");
                uploader.alert("Upload files must not exceed 4M");
                return false;
            }
        },
        checkFileExt:function(filename){
            var uploader =this;
            var ext = filename.substr(filename.lastIndexOf(".")+1);
            if(this.fileExtArr && this.fileExtArr.indexOf(ext.toLowerCase()) == -1 ){
                uploader.input.val("");
                // uploader.alert("验证失败，仅能上传"+uploader.fileExtArr+"类型的文件");
                uploader.alert("Validation failure，can only upload"+uploader.fileExtArr+"type");
                return false;
            }
        },
        alert:function(msg){
            if(window.layer){
                window.layer.msg(msg);
            }else{
                alert(msg);
            }
        },
        initValue:function(ids){
            var uploader = this;
            if(uploader.perRender){
                $(uploader.ids.split(',')).each(function(idx,item){
                    setTimeout(function(){
                        uploader.renderFile(item);
                    },500)
                });
            }
            uploader.hiddenField.val(uploader.ids);
        },
        onReceive:function(e,data){
            $(this).fileupload().renderFile(data["path"]);
        },
        renderFile:function(id){
            if (id != '') {
                var imageUrl = this.fileRenderUrl.replace('{path}', id);
                var vvalue = this.input[0].value;
                var arr = vvalue.split("\\");
                vvalue = arr[arr.length -1];
                if(this.muti) {
                    var img = jQuery(this.imgTemplate);
                    img.data('path', id);
                    if(img.hasClass("file-download")){
                        img.attr('href', imageUrl).text(id)
                    }else{
                        img.find('a.file-download').attr('href', imageUrl).text(vvalue);
                    }
                    if(img.hasClass("file-download-name")){
                        img.attr('href', imageUrl).text(vvalue);
                    }else{
                        img.find('a.file-download-name').attr('href', imageUrl).text(vvalue);
                    }
                    var lastChild = this.fileContianer.children(".image-child:last");
                    if(lastChild.get(0)){
                        lastChild.after(img);
                    }else{
                        this.fileContianer.prepend(img);
                    }
                }else{
                    var template = this.fileContianer.find("a.file-download:eq(0)");
                    template.attr('href', imageUrl).text(id);   //设置路径
                    var template2 = this.fileContianer.find("a.file-download-name:eq(0)");
                    template2.attr('href', imageUrl).text(vvalue); //设置名称
                }
            }
        },
        parseResult :function (url) {
            var paramstr = url.substr(url.indexOf("?")+1);
            var paramArr = paramstr.split("&");
            var result ={};
            for(var i = 0;i<paramArr.length ; i++){
                var str = paramArr[i];
                var key = str.substr(0,str.indexOf("="));
                var val = str.substr(str.indexOf("=") + 1);
                result[key] = val;
            }
            return result;
        },
        proxy:function(funcs){
            var _this = this;
            $.each(funcs,function(idx,func){
                _this[func] =  function(){
                    $.fn[func].apply($(_this.dom),arguments);
                }
            })
        }
    });
    var ImageUploader = function(dom,params){
        FileUploder.call(this,dom,params);
    };
    baseParams.imageContianer = null;
    $.extend(ImageUploader.prototype,FileUploder.prototype);
    $.extend(ImageUploader.prototype,{
        initParams:function(dom,params){
            FileUploder.prototype.initParams.call(this,dom,params);
            $.extend(this,{
                // fileExtStr:"jpg,jpeg,png,gif,bmp,doc,pdf",
                fileExtStr:this.fileExtStr,
                fileContianer:this.imageContianer
            });
        },
        onReceive:function(e,data){
            $(this).fileupload().renderFile(data["id"]);
        },
        setValue:function(result){
            var path = result["id"];
            var uploader =this;
            if(uploader.muti){
                var val = uploader.hiddenField.val();
                if(val!=''){
                    val += ',';
                }
                val += path;
                uploader.hiddenField.val(val);
            }else{
                uploader.hiddenField.val(path);
            }
        },
        renderFile:function(id){
            if (id != '') {
                if(this.muti) {
                    var img = jQuery(this.imgTemplate);
                    img.data('id', id);
                    var imageUrl = this.imageUrl.replace('{id}', id);
                    if(img.get(0).tagName == "IMG"){
                        img.attr('src', imageUrl);
                    }else{
                        img.find('img').attr('src', imageUrl);
                    }
                    var lastChild = this.fileContianer.children(".image-child:last");
                    if(lastChild.get(0)){
                        lastChild.after(img);
                    }else{
                        this.fileContianer.prepend(img);
                    }
                }else{
                    var imageUrl = this.imageUrl.replace('{id}', id);
                    var template = this.fileContianer.find("img:eq(0)");
                    $(template).attr("src",imageUrl);
                }
            }
        },
        initValue:function(ids){
            var uploader = this;
            if(uploader.perRender){
                $(uploader.ids.split(',')).each(function(idx,item){
                    setTimeout(function(){
                        uploader.renderFile(item);
                    },500)
                });
            }
            uploader.hiddenField.val(uploader.ids);
        }
    });

    var KotoUploader = function(dom,params){
        FileUploder.call(this,dom,params);
    };
    $.extend(KotoUploader.prototype,FileUploder.prototype);
    $.extend(KotoUploader.prototype,{ initParams : function () {
        FileUploder.prototype.initParams.apply(this,arguments);
        if(this.uploadToUrl.substr(this.uploadToUrl.length-1 ) == "/"){
            this.uploadToUrl += "upload/upfile.htm"
        }
        this.fileRenderUrl = this.uploadToUrl.replace("upload/upfile.htm","{path}");
        this.uploadName = "upfile";
        this.redirectUrl = url + "?id={id}&path={path}&error={error}";
    }});
    var KotoImageUploader = function(dom,params){
        ImageUploader.call(this,dom,params);
    };
    $.extend(KotoImageUploader.prototype,ImageUploader.prototype);
    $.extend(KotoImageUploader.prototype,{ initParams : function () {
        ImageUploader.prototype.initParams.apply(this,arguments);
        if(this.uploadToUrl.substr(this.uploadToUrl.length-1 ) == "/"){
            this.uploadToUrl += "upload/upimg.htm"
        }
        this.fileRenderUrl = this.uploadToUrl.replace("upload/upimg.htm","id={id}");
        this.uploadName = "imgFile";
        this.redirectUrl = url + "?id={id}&path={path}&error={error}";
    }});


    jQuery.fn.fileupload = function (params) {
        if (params) {
            for (var key in baseParams) {
                if (!params[key]) {
                    params[key] = baseParams[key];
                }
            }
        }else{
            return $(this).data('fileuplodComponent');
        }
        var fileuploads = [];
        $(this).each(function () {
            if (!$(this).data('fileuplodComponent')) {
                var type = $(this).data("type");
                type = type || "image" ;
                var component = type=="image"? new KotoImageUploader(this,params):
                    new KotoUploader(this, params);
                fileuploads.push(component);
                $(this).data('fileuplodComponent', component);
            }
        });
        return $(fileuploads);
    };
    jQuery.fn.fileupload.version = '2.3';
    jQuery.fileupload = function (baseparams) {
        for(var paramkey in baseParams){
            if(baseparams[paramkey.toLowerCase()] !== undefined ){
                baseParams[paramkey] = baseparams[paramkey.toLowerCase()];
            }else if(baseparams[paramkey] !== undefined){
                baseParams[paramkey] = baseparams[paramkey];
            }
        }
    };
    $(function () {
        if(baseParams.autoInit){
            $(".fileupload").fileupload(baseParams);
        }
    });
    var url = "about:blank";
    var p = $(document.scripts[document.scripts.length - 1]).data();
    if(!p.uploadToUrl){
        var attrs = document.scripts[document.scripts.length - 1].attributes;
        for(var i = 0 ; i< attrs.length ;i++){
            var node = attrs[i];
            var nodename = node.nodeName;
            if(nodename.indexOf("data-") ==0){
                p[nodename.substr(5)] = node.value;
            }
            if(nodename == "src"){
                url=node.value.replace("js","htm");
            }
        }

    }
    jQuery.fileupload(p);

})(jQuery);