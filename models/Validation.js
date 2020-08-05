var validation= function(){
    this.kiemTraRong= function(value,selectorError){
        if(value.trim()===""){
            document.querySelector(selectorError).innerHTML='Không được bỏ trống';
            document.querySelector(selectorError).style.display='block';
            return false;
        }
        document.querySelector(selectorError).innerHTML='';
        document.querySelector(selectorError).style.display='none';
        return true;

    }
    this.kiemTraTatCaLaChuoi= function(value, selectorError){
        var regexAllLetter=/^[a-z A-Z]+$/;
        if(!regexAllLetter.test(value.trim())){
            document.querySelector(selectorError).style.display='block';
            document.querySelector(selectorError).innerHTML='Không được nhập số và ký tự đặc biệt';
            return false;
        } else{
            document.querySelector(selectorError).style.display='none';
            return true;
        }
    }

    this.kiemTraEmail= function(value, selectorError){
        var regexEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regexEmail.test(value.trim())){
            document.querySelector(selectorError).style.display='block';
            document.querySelector(selectorError).innerHTML='Email không hợp lệ';
            vilid= false;
        } else{
            document.querySelector(selectorError).style.display='none';
            return true;
        }
    }

    this.kiemTraSo= function(value, selectorError){
        var regexNumber=/^[0-9]+$/;
        if (!regexNumber.test(value.trim())){
            document.querySelector(selectorError).style.display='block';
            document.querySelector(selectorError).innerHTML='Điểm không hợp lệ';
            return false;
        } else{
            document.querySelector(selectorError).style.display='none';
            return true;
        }
    }
    this.kiemTraDoDai= function(value, selectorError, minLength, maxLength){
        if (value.length< minLength || value.lengt> maxLength){
            document.querySelector(selectorError).innerHTML=`Độ dài từ ${minLength}- ${maxLength}!`;
            document.querySelector(selectorError).style.display='block';
            return false;
        }else{
            document.querySelector(selectorError).style.display='none';
            return true;
        }
    }
}