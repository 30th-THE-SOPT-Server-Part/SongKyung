// //var
// var name = '유송경';
// var name = '이승헌';
// console.log(name)

// //let
// let name2 = '박진수';
// // let name2 = '김희빈';
// // console.log(name2) -> 재선언 오류

// //const
// const name4 = '김루희';
// // name4 = '주효식' -> 재할당 오류

// //Scope
// if (true){
//     var x = 'var variable';
// }
// console.log(x); //-> var: Function Scope

// if (true){
//     const y = 'const variable';
// }
// // console.log(y) -> const,let: Block Scope => scope 오류

function foo (){
    if(true){
        var name = '채정아';
        console.log('if -block-',name);
    }
    console.log('function-block-',name);
}
console.log('global-',name);