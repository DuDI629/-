let Arraylist = [
    {
        name:"曾小伟",
        age:"18",
        sex:"男"
    },
    {
        name:"曾小伟",
        age:"18",
        sex:"男"
    },
    {
        name:"曾小伟",
        age:"18",
        sex:"男"
    },
    {
        name:"曾小伟",
        age:"18",
        sex:"男"
    }
]

$(function(){
    

    $("#Addtable").on('click',function(){
        let name = $("#name").val();
        let age = $("#age").val();
        let sex = $("#sex").val();


        if(name == "" || age == "" || sex == "undefined"){
            alert("请输入完整的信息")
            return;
        }

        let data = {
            name:name,
            age:age,
            sex:sex
        }
        if(Filter(Arraylist,name)){
            alert('你输入的该用户已经存在');
            return;
        }
        Arraylist.push(data)
        drawing(Arraylist)
        $("#name").val("");
        $("#age").val("");
        $("#sex").val("");
    })
    //过滤器
    function Filter(array,name){
        for(let i=0; i<array.length;i++){
            if(array[i].name === name){
                return true;
            }
        }
        return false;
    }

    $("#search").on('click',function(){
        let searchname = $("#searchname").val();
        let array =   Select(Arraylist,searchname);
        drawing(array);
    })

    //查询
    function Select(array,item){
        return  array.filter(function(arrayitem){
            return arrayitem.name.includes(item)
        })
    };
    
    //渲染表格
    function drawing(array){
        $('#table').empty();

        let foolter  = `<tr><td>姓名</td><td>性别</td><td>年龄</td><td>操作</td></tr>`
        for(let i=0; i<array.length;i++){
            foolter += `<tr id="tr${i}"><td><input type="text"  disabled="disabled" value="${array[i].name}" /> 
            </td><td><input type="text"  disabled="disabled" value="${array[i].sex}" /></td>
            <td><input type="number"  disabled="disabled" value="${array[i].age}" /></td>
            <td class="btn">
            <button class="btn1" id="button${i}" style="display:block;float:left;"value="删除">删除</button>
            <button class="btn2" id="button${i}" style="display:block;float:left;" value="修改">修改</button>
            <button class="btn3" id="button${i}" style="display:none;float:left;" value="确定">确定</button>
            <button class="btn4" id="button${i}" style="display:none;float:left;" value="取消" >取消</button>
            </td></tr>`
        }
        $("#table").append(foolter)
    }

    drawing(Arraylist);
    
    //删除修改点击事件
    $("#table").on('click','button',function(e){
        let key = e.target.id.split('n',2);
        let list = $(this).siblings();
        if(e.target.innerHTML == '删除'){
            Arraylist.splice(key[1],1);
            drawing(Arraylist);
        }
        if(e.target.innerHTML == '修改'){
            $(this).css('display','none');
            for(let i=0; i<list.length;i++){
                if(list[i].value != '删除'){
                    list[i].style.display = 'block'
                }else{
                    list[i].style.display = 'none'
                }
            }

            let input = $(`#tr${key[1]}`).find("input")
            for(let i=0; i<input.length;i++){
                input[i].disabled = false
                input[i].style.border = "1px solid #000"
            }
        }
        if(e.target.innerHTML == '取消'){
            $(this).css('display','none');
            for(let i=0; i<list.length;i++){
                if(list[i].value != '确定'){
                    list[i].style.display = 'block'
                }else{
                    list[i].style.display = 'none'
                }
            }
            let input = $(`#tr${key[1]}`).find("input")
            for(let i=0; i<input.length;i++){
                input[i].disabled = true
                input[i].style.border = "none"
            }
            drawing(Arraylist);
        }
        if(e.target.innerHTML == '确定'){
            $(this).css('display','none');
            for(let i=0; i<list.length;i++){
                if(list[i].value != '取消'){
                    list[i].style.display = 'block'
                }else{
                    list[i].style.display = 'none'
                }
            }
            let input = $(`#tr${key[1]}`).find("input")
            for(let i=0; i<input.length;i++){
                input[i].disabled = true
                input[i].style.border = "none"
            }
        }
    })
    // console.log(Select(Arraylist,"123"));
 });