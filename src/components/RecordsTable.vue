<template>
  <div class="pt-75 w-50 mx-auto">
    <div class="layout-row align-items-center justify-content-center">
      <input type="date" class="large outlined" data-testid="app-input" v-model="filterDate" placeholder="Filter Date" />
      <button class="" data-testid="submit-button" @click="filterTransactions">Filter</button>
    </div>
    <div class="card mx-auto table-card mt-50 pb-10">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th data-testid="amount" class="sortable" @click="sortTransactions">Amount ($)</th>
            <th>Available Balance</th>
          </tr>
        </thead>

        <tbody data-testid="records-body">
          <tr v-for="txn in dispalyedTransactions" :key="txn.description">
            <td>{{ txn.date }}</td>
            <td>{{ txn.description }}</td>
            <td>{{ txn.type === 1 ? "Debit" : "Credit" }}</td>
            <td>{{ txn.amount }}</td>
            <td>{{ txn.balance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecordsTable",
  props: {
    transactions: Array,
  },
  data() {
    return {
      dispalyedTransactions: this.transactions,
      filterDate: "",
    }
  },
  created() {

  },
  methods: {
    sortTransactions() {
      this.dispalyedTransactions.sort((a, b) => {
        return a.amount - b.amount;
      });
    },
    filterTransactions() {
      if (this.filterDate) {
        this.dispalyedTransactions = this.transactions.filter((txn) => {
          return txn.date === this.filterDate;
        });
      } else {
        this.dispalyedTransactions = this.transactions;
      }
    },
  },
}
</script>

<style scoped></style>
