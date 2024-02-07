<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px">
            <h1>회원 목록</h1>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>이름</th>
                    <th>Email</th>
                    <th>도시</th>
                    <th>상세주소</th>
                    <th>우편정보</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <OrderListComponent :isAdmin="false" apiUrl="http://localhost:8080/member/myorders" />
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';
export default {
    components: {
        OrderListComponent
    }
}
</script>