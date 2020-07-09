var app = new Vue({
    el: '#app',
    data:{ //vue 객체에서 바인딩하여 공유할 데이터들
  
		mode:'list', //SPA의 페이지 모드 설정
        memo: { //memo 관련 DTO
            id:null,
            content : null,
            regDate: null
        },
    	memos: [
		{id:1,content:'일정-VUE학습',regDate:new Date()},
		{id:2,content:'일정-React학습',regDate:new Date()},
		{id:3,content:'일정-nodejs학습',regDate:new Date()}
     	]  
    },
    methods: { //뷰 객체의 메소드
        renew: function(val){
            return JSON.parse(JSON.stringify(val));//입력받은 객체를 복사한 새로운 객체 생성
        },
        open : function(id){
            for(var i in this.memos){
                if(this.memos[i].id === id){
                    this.memo = this.renew(this.memos[i]);
                    break;
                }
            }
            this.mode = 'edit';
        },
        write: function(){
            this.mode = 'write';
            this.memo = {
                id:null,
                content : null,
                regDate: null
            };
        },
        remove: function(){
        
        if(confirm('삭제하시겠습니까?')){
            for(var i in this.memos){
                    if(this.memos[i].id === this.memo.id){
                        this.memos.splice(i, 1);
                        break;
                    }
                }
                
            this.mode = 'list';
            localStorage.setItem('memos', JSON.stringify(this.memos));
            }
        },
        save: function(){
            var id = this.memos.length + 1;
            
            if(this.mode ==='write'){
            this.memos.push(
                {
                    id: id,
                    content: this.memo.content,
                    regDate: new Date()
                }
            );
            }
            else if(this.mode ==='edit'){
                for(var i in this.memos){
                    if(this.memos[i].id === this.memo.id){
                        this.memos[i] = this.renew(this.memo);
                        break;
                    }
                }
            }
            this.mode = 'list';
            localStorage.setItem('memos', JSON.stringify(this.memos)); //로컬에 JSON 형태로 값을 저장
        }
    },
    created: function(){ //뷰 객체의 생성자
        var memos = localStorage.getItem('memos');
        
        if(memos){
            this.memos = JSON.parse(memos); //JSON을 파싱해서 사용함.
        }
    }
});