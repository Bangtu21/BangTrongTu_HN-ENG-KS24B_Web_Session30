let managers = [];
let cart = [];
let choice;

do{
    console.log("MENU");
    console.log("1. Hiển thị danh sách theo thể loại");
    console.log("2. Thêm sách mới vào kho");
    console.log("3. Tìm kiếm sách theo tên hoặc id");
    console.log("4. Mua sách");
    console.log("5. Sắp xếp sách theo giá");
    console.log("6. Tính tổng số lượng sách đã mua và in ra tổng số tiền trong giỏ hàng");
    console.log("7. Hiển thị tổng số lượng sách trong kho");

    choice = +prompt(`Lựa chọn của bạn`);

    switch (choice) {
        case 1:
            showBook();
            break;
        case 2:
            addBook();
            break;
        case 3:
            console.log("1. Tìm kiếm theo id sách");
            console.log("2. Tìm kiếm theo tên sách");
            let select = +prompt(`Nhập lựa chọn của bạn`);
            if(select !== 1 && select !== 2){
                console.log(`Lựa chọn không hợp lệ`);                              
            }else{
                if(select===1){
                    searchIdBook();
                }
                if(select===2){
                    searchNameBook();
                }
            }
            break;
        case 4:
            buyBooks();
            break;
        case 5:
            console.log("a. Tăng dần");
            console.log("b. Giảm dần");
            let choose = prompt(`Nhập lựa chọn của bạn`);
            if(choose !== "a" && choose !== "b"){
                console.log(`Lựa chọn không hợp lệ`);
                               
            }else{
                if(choose==="a"){
                    up();
                }
                if(choose==="b"){
                    down();
                }
            }
            
            break;
        case 6:
            allCart();
            break;
        case 7:
            allBooks();
            break;
    
        default:
            console.log(`Lựa chọn không hợp lệ, hãy chọn lại`);
            
    }
    
}while(choice != 8)

function showBook(){
    let categories = prompt(`Nhập tên thể loại sách`);
    let filterManagers = managers.filter(manager => manager.category === categories);
    if(filterManagers.length === 0){
        console.log(`Không có không có sách nào thuộc thể thoại: ${categories}`);
    }else{
        console.log(`Sách thuộc thể loại: ${categories}`);
        console.table(filterManagers);
    }
}

function addBook(){
    let id = +prompt(`Nhập mã sách`);
    let name = prompt(`Nhập tên sách`);
    let price = +prompt(`Nhập giá sách`);
    let quantity = +prompt(`Nhập số lượng sách`);
    let category = prompt(`Nhập thể loại sách`);
    managers.push({id, name, price, quantity, category});
}

function searchIdBook(){
    let searchId = +prompt(`Nhập id sách bạn muốn tìm kiếm`);
    let managersIndex = managers.findIndex((item)=>item.id===searchId);
    if(managersIndex){
        console.log(`Thông tin sách`);
        console.table(managersIndex);
    }else{
        console.log(`Id sách không tồn tại`);
    }
}

function searchNameBook(){
    let searchName = prompt(`Nhập tên sách bạn muốn tìm kiếm`);
    let books = managers.filter(item => item.name.includes(searchName)); 
    if (books.length > 0) {
        console.log("Danh sách sách tìm thấy:");
        console.table(books);
    } else {
        console.log(`Không tìm thấy sách với tên: ${searchName}`);
    }
}

function buyBooks(){
    let buyId = +prompt(`Nhập id sách bạn muốn mua`);
    let managersIndex = managers.findIndex((item)=>item.id===buyId);
    if(managersIndex === -1){
        console.log(`Sản phẩm không tồn tại`);
        return;
    }
    let selectQuantity = +prompt(`Nhập số lượng sản phẩm bạn muốn mua`);
    if(managers[managersIndex].quantity < selectQuantity){
        console.log(`Không đủ số lượng để mua`);
        return;
    }
    managers[managersIndex].quantity -= selectQuantity;
    let cartIndex = cart.findIndex((item) => item.id === buyId);
    if(cartIndex === -1){
        cart.push({
            id: buyId,
            name: managers[managersIndex].name,
            price: managers[managersIndex].price,
            category: managers[managersIndex].category,
            quantity: selectQuantity,
        })
    }else{
        cart[cartIndex].quantity += selectQuantity;
    }
}

function up(){
    managers.sort((a,b)=>a.price - b.price);
    console.log("Danh sách sản phẩm sắp xếp theo giá tăng dần:");
    console.table(managers);
}

function down(){
    managers.sort((a,b)=>b.price - a.price);
    console.log("Danh sách sản phẩm sắp xếp theo giá giảm dần:");
    console.table(managers);
}

function allCart(){
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    console.log(`Tổng số lượng sách đã mua: ${totalQuantity}`);
    console.log(`Tổng số tiền trong giỏ hàng: ${totalPrice}`);
}

function allBooks(){
    let total = managers.reduce((sum, book) => sum + book.quantity, 0);
    console.log(`Tổng số lượng sách trong kho: ${total}`);
}