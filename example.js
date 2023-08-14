const util = require('./util.js');

/*
    onCreateServer, onAppBootstrap와 같이
    코드가 실행될 때 초기화(DB 연결 및 s3 연결)
*/
function inital(){
    /* securePath 기능 사용 예시 */
    securePathExample();


    /*
        * DB 연결(pool) 생성
        * 내부 DB와 외부 DB 2개 이상의 서버에 접속에 용의하도록
        * setting.js 파일과 connect시 여러개의 DB host 지정 가능
    */
    /* database1(setting.js) pool(연결) 생성 */
    util.mysql.connect('database1');

    /* database2(setting.js) pool(연결) 생성 */
    util.mysql.connect('database2');
    
    
    /* mysql 기능 사용 예시 */
    DBExample();


    /* mysql 기능 사용 예시 */
    encryptExample();

    
    /* formating 기능 사용 예시 */
    formatingExample();
}

/* securePath 예시 */
function securePathExample(){
    /* 상위 폴더로 이동하여 접근 시도 */
    let path1 = `deniedFolder/` + util.securePath('topPosition/../../current/otherFile.dd');
    console.log(path1) // deniedFolder/current/otherFile.dd (deniedFolder로 접근 불가)

    let path2 = util.securePath('topPosition/current/../folder/../otherFile.dd');
    console.log(path2) // topPosition/otherFile.dd (경로 예쁘게 정리됨)
}

/* mysql DB 예시 */
async function DBExample(){
    /*
        * sql 쿼리 실행
        * 기본적으로 매개변수로 DB명(setting에 지정) 필요
    */

    /* select문 예시 */
    let select1 = await util.mysql.select(
        'database1',        // database1 에서
        '*',                // 모든 컬럼을(와일드카드 *)
        'book'              // book 테이블에서
    )
    console.log(select1)

    /* select문 예시(where) */
    let bookName = '노인과 바다';
    let select2 = await util.mysql.select(
        'database1',        // database1 에서
        'pk, name, price',  // 세가지 컬럼을
        'book',             // book 테이블에서
        'name=?',           // name이 ?와 같은 레코드
        [ bookName ]        // ?은 bookName
    )
    console.log(select2)

    /* select문 예시(order, limit) */
    let select3 = await util.mysql.select(
        'database2',        // database2 에서
        'name, price',      // 두가지 컬럼을
        'ticket',           // ticket 테이블에서
        '',                 // 아무런 where 없이
        [  ],               // (where 조건 없음)
        'price DESC',       // price를 내림차순으로
        '20, 10'            // index 20번째 부터 10개

    )
    console.log(select3)


    /* update문 예시 */
    await util.mysql.update(
        'database1',        // database1 에서
        'book',             // book 테이블에
        {                   // 아래 컬럼들을 해당 데이터로 변경
            price: 200,
            position: 'E2',
            onSale: false
        },
        'pk=?',             // pk가 ?인 레코드를
        [ 100 ]             // ?는 100
    )


    /* insert문 예시 */
    await util.mysql.insert(
        'database1',        // database1 에서
        'book',             // book 테이블에
        {                   // 아래 컬럼들을 해당 데이터로 삽입
            name: '누구나 쉽게 배우는 기계어',
            price: 300000,
            onSale: true
        }
    )


    // delete, count, sum...
}

/* encrypt 예시 */
function encryptExample(){
    let str = "이것은 문자열입니다. 아주 중요한 정보일 수 있고 아닐까??";
    console.log(str);

    let oneWay1 = util.encrypt.oneWay(str); // 단방향 암호화
    console.log(`단방향 암호화(oneWay): ${oneWay1}`);

    let oneWay2 = util.encrypt.oneWay(str); // 단방향 암호화
    console.log(`단방향 암호화(oneWay): ${oneWay2}`);
    console.log("oneWay는 항상 같은 결과 제공");


    let short = util.encrypt.shortHash(str, 2); // 길이지정 해시
    console.log(`길이지정 해시(shortHash): ${short}`);


    let encode1 = util.encrypt.encode(str); // 양방향 암호화
    console.log(`양방향 암호화(encode): ${encode1}`);

    let encode2 = util.encrypt.encode(str); // 양방향 암호화
    console.log(`양방향 암호화(encode): ${encode2}`);
    console.log("encode는 항상 다른 결과 제공");


    let decode1 = util.encrypt.decode(encode1); // 양방향 복호화
    console.log(`양방향 복호화(decode): ${decode1}`);

    let decode2 = util.encrypt.decode(encode2); // 양방향 복호화
    console.log(`양방향 복호화(decode): ${decode2}`);
    console.log("그러나 decode시 원본값 같음");
}

/* formating 예시 */
function formatingExample(){
    let date1 = new Date();
    let dateString1 = date1.stringFormat('y-m-d h:i:s');
    console.log(dateString1);

    let dateString2 = new Date('2023-08-15').stringFormat('m월 d일 h시 i분');
    console.log(dateString2);


    let sec1 = 7203;
    let timeFormat1 = sec1.secToTime();
    console.log(timeFormat1);

    let sec2 = 302391;
    let timeFormat2 = sec2.secToTime();
    console.log(timeFormat2);

    let sec3 = 302391;
    let timeFormat3 = sec3.secToTime('hour');
    console.log(timeFormat3);


    let number1 = 2_304;
    let humanRead1 = number1.toReadFormat();
    console.log(humanRead1);

    let number2 = 32_230_214;
    let humanRead2 = number2.toReadFormat();
    console.log(humanRead2);
}

inital();