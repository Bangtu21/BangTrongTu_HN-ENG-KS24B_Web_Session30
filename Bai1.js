let products = [
    {
        id: 1,
        name: "Mèn mén",
        price: 20000,
        quantity: 20,
        category: "Món ăn dân tộc Mông",
    },
    {
        id: 2,
        name: "Mứt",
        price: 80000,
        quantity: 21,
        category: "Món ăn dân tộc Kinh",
    },
    {
        id: 3,
        name: "Cơm lam",
        price: 40000,
        quantity: 15,
        category: "Món ăn dân tộc Mông",
    },
    {
        id: 4,
        name: "Bánh đậu xanh",
        price: 60000,
        quantity: 30,
        category: "Món ăn dân tộc Kinh",
    }
]

let cart = [];//giỏ hàng

let choice;
do{
    console.log("MENU");
    console.log("1. Hiển thị các sản phẩm theo tên danh mục");
    console.log("2. Chọn sản phẩm để mua bằng cách nhập id sản phẩm");
    console.log("3. Sắp xếp các sản phẩm trong cửa hàng theo giá");
    console.log("4. Tính số tiền thanh toán trong giỏ hàng");

    choice = +prompt(`Lựa chọn của bạn là:`);
    
    switch(choice){
        case 1:
            showItems();
            break;
        case 2:
            selectItem();
            break;
        case 3:
            console.log("a. Tăng dần");
            console.log("b. Giảm dần");
            let select = prompt(`Nhập lựa chọn của bạn`);
            if(select !== "a" && select !== "b"){
                console.log(`Lựa chọn không hợp lệ`);
                               
            }else{
                if(select==="a"){
                    up();
                }
                if(select==="b"){
                    down();
                }
            }
            
            break;
        case 4:
            allMoney();
            break;
    
        default:
            console.log(`Lựa chọn không hợp lệ hãy chọn lại`);
            
    }

}while(choice != 5)

function showItems(){
    let categories = prompt(`Nhập tên danh mục sản phẩm`);
    let filterProducts = products.filter(product => product.category === categories);
    if(filterProducts.length === 0){
        console.log(`Không có sản phẩm nào thuộc danh mục: ${categories}`);
    }else{
        console.log(`Sản phẩm thuộc danh mục: ${categories}`);
        console.table(filterProducts);
    }
}

function selectItem(){
    //B1: Yêu cầu nhập id sản phẩm muốn mua
    let selectId = +prompt(`Nhập id món ăn muốn mua`);

    //B2: Kiểm tra xem sản phẩm có tồn tại hay không
    let productIndex = products.findIndex((item) => item.id === selectId);
    if(productIndex === -1){
        //B3: Nếu không tồn tại thì thông báo và kết thúc hàm
        console.log(`Sản phẩm không tồn tại`);
        return;
    }

    //B4: Nếu tồn tại thì yêu cầu người dùng nhập số lượng muốn mua
    let selectQuantity = +prompt(`Nhập số lượng sản phẩm bạn muốn mua`);

    //B5: Kiểm tra xem số lượng còn lại có đủ không
    if(products[productIndex].quantity < selectQuantity){
        //B6: Nếu không đủ thì thông báo và kết thúc hàm
        console.log(`Không đủ số lượng để mua`);
        return;
    }

    //B7: Nếu đủ thì giảm số lượng sản phẩm trong mảng sản phẩm đi
    products[productIndex].quantity -= selectQuantity;

    //B8: Kiểm tra xem trong giỏ đã có sản phẩm đó chưa
    let cartIndex = cart.findIndex((item) => item.id === selectId);

    //B9: Nếu chưa có thì thêm sản phẩm vào giỏ hàng
    if(cartIndex === -1){
        cart.push({
            id: selectId,
            name: products[productIndex].name,
            price: products[productIndex].price,
            category: products[productIndex].category,
            quantity: selectQuantity,
        })
    }else{
        //B10: Nếu có rồi thì chỉ tăng số lượng sản phẩm trong giỏ hàng lên
        cart[cartIndex].quantity += selectQuantity;
    }
}

function up(){
    // for (let i = 0; i < products.length - 1; i++) {
    //     for (let j = 0; j < products.length - 1 - i; j++) {
    //         if (products[j].price > products[j + 1].price) {
    //             let temp = products[j];
    //             products[j] = products[j + 1];
    //             products[j + 1] = temp;
    //         }
    //     }
    // }
    products.sort((a,b)=>a.price - b.price);
    console.log("Danh sách sản phẩm sắp xếp theo giá tăng dần:");
    console.table(products);
}

function down(){
    // for (let i = 0; i < products.length - 1; i++) {
    //     for (let j = 0; j < products.length - 1 - i; j++) {
    //         if (products[j].price < products[j + 1].price) {
    //             let temp = products[j];
    //             products[j] = products[j + 1];
    //             products[j + 1] = temp;
    //         }
    //     }
    // }
    products.sort((a,b)=>b.price - a.price);
    console.log("Danh sách sản phẩm sắp xếp theo giá giảm dần:");
    console.table(products);
}

function allMoney(){
    let total=0;
    cart.forEach((product) => total += product.quantity * product.price);
    console.log(`Tổng số tiền trong giỏ hàng là ${total}`);
    
}
