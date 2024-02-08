<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px">
            <h1>상품목록</h1>
        </div>
        <div class="d-flex justify-content-between" style="margin-top: 20px;">
            <form @submit.prevent="onSearch()">
                <select v-model="searchType" class="form-control"
                    style="display:inline-block; width:auto; margin-right:5px">
                    <option value="optional">선택</option>
                    <option value="name">이름</option>
                    <option value="category">카테고리</option>
                </select>
                <input v-model="searchValue" type="text" class="form-control"
                    style="display:inline-block; width:auto; margin-right:5px" />
                <button type="submit" class="form-control"
                    style="display:inline-block; width:auto; margin-right:5px">검색</button>
            </form>
            <div><button @click="addCart" class="btn btn-secondary" style="margin-right: 10px">장바구니</button>
                <button @click="placeOrder" class="btn btn-success">주문하기</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>제품 사진</th>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>재고수량</th>
                    <th>주문수량</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itemList" :key="item.id">
                    <!-- checkbox를 선택하면 value가 true가 담기게 됨 -->
                    <td><input type="checkbox" v-model="selectedItems[item.id]" /></td>
                    <td><img :src="getImage(item.id)" style="height: 100px; width:auto" /></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.stockQuantity }}</td>
                    <td><input v-model="item.quantity" type="number" min="1" style="width: 50px" /></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            itemList: [],
            pageSize: 10,
            currentPage: 0,
            searchType: 'optional',
            searchValue: '',
            isLoading: false,
            isLastPage: false,
            selectedItems: {},
        };
    },
    created() { // 화면이 그려지면서 실행됨
        this.loadItems();
    },
    // mounted : Window DOM 객체가 생성된 이후에 실행되는 hook 함수 (화면이 다 그려진 후 호출됨)
    mounted() {
        // scroll 동작이 발생할 때마다 scrolPagination 함수가 호출이 된다는 뜻!
        window.addEventListener('scroll', this.scrollPagination);
    },
    methods: {
        scrollPagination() {
            // innerHeight : 브라우저 창의 내부 높이를 픽셀 단위로 변환 (viewport height, 사용자의 눈에 보이는 창)
            // offsetHeight : 전체 브라우저 창의 높이
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (nearBottom && !this.isLastPage && !this.isLoading) {
                this.currentPage++;
                this.loadItems();
            }
        },
        getImage(itemId) {
            return `${process.env.VUE_APP_API_BASE_URL}/item/${itemId}/image`;
        },
        async loadItems() {
            this.isLoading = true;
            try {
                // params 키워드 사용해야 파라미터 방식으로 axios 요청 가능
                const params = {
                    page: this.currentPage,
                    size: this.pageSize,
                    [this.searchType]: this.searchValue,
                };
                // if (this.searchType === "name") {
                //     params.name = this.searchValue;
                // }
                // else if (this.searchType === "categroy") {
                //     params.name = this.serachValue;
                // }
                console.log(params);
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/items`, { params });
                const addItemList = response.data.map(item => ({...item, quantity:1}));
                if (addItemList.length < this.pageSize) {
                    this.isLastPage = true;
                }
                this.itemList = [...this.itemList, ...addItemList];
                this.isLoading = false;
            }
            catch (error) {
                console.log(error);
            }
        },
        onSearch() {
            this.itemList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.loadItems();
        },
        placeOrder() {
            // {"1":true, "2": false, "3":true ..} 형식
            console.log(this, this.selectedItems);
            // Obejct.keys : 위 데이터 구조에서 1, 2 등 key 값만 추출하는 메서드

            const orderItems = Object.keys(this.selectedItems)
                .filter(key => this.selectedItems[key] === true)
                .map(key => {
                    const item = this.itemList.find(i => i.id == key);
                    return { itemId: item.id, count: item.quantity };
                });
            console.log(orderItems);
        }
    },
}
</script>

<style lang="scss" scoped></style>