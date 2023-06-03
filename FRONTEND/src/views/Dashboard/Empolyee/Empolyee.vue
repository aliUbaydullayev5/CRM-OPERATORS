<script setup>
import { ref, reactive, onMounted } from "vue";
const modal = ref(true);
import { useEmployeeStore } from "../../../stores/employee/employee";
import { toast } from "vue3-toastify";
import { employee } from "../../../service/empolyee";

const showhide = () => {
  modal.value = !modal.value;
};

const state = useEmployeeStore();

const totalPage = ref(null);
const currentPage = ref(null);

const user = reactive({
  full_name: "",
  phone_number: "",
  card: "",
  login: "",
  password: "",
  role: "",
});

const listUpdate = (num) => {
  employee.list(num).then((res) => {
    totalPage.value = res?.data?.data?.pagination?.totalPages;
    currentPage.value = res?.data?.data?.pagination?.currentPage;

    if (res.status === 200) {
      state.setList(res?.data?.data?.records);
      localStorage.setItem("page_num", currentPage);
    }
  });
};

const addUser = () => {
  const newUser = {
    full_name: user.full_name,
    phone_number: user.phone_number,
    card: user.card,
    login: user.login,
    password: user.password,
    role: user.role.toUpperCase(),
  };

  employee
    .create(newUser)
    .then((res) => {
      toast.success("Yangi xodim muaffaqiyatli qo'shildi !");
      listUpdate();
      showhide();
      user.full_name = "";
      user.phone_number = "";
      user.card = "";
      user.login = "";
      user.password = "";
      user.role = "";
    })
    .catch((err) => {
      toast.error("Nimadur xato ketdi");
    });
};

const paginate = (num) => {
  localStorage.setItem("page_number", num);
  listUpdate(num);
};

const is_active = (status, id) => {
  let stat = !status;


  const user = {
    id: id,
    value: stat,
  };

  employee.statusUpdate(user).then((res) => {
    if (res.status === 200) {
      toast.success("Muvaffaqiyatli bajarildi!");
      setTimeout(() => {
        listUpdate(localStorage.getItem("page_number") || 1);
      }, 200);
    } else {
      toast.error("Nimadur xato ketdi");
    }
  });
};

const onDelete = (id) => {
  employee.delete(id).then((res) => {
    if (res.status === 200) {
       listUpdate(localStorage.getItem("page_number") || 1);
       toast.success("Muvaffaqiyatli o'chirildi!");
    }
  });
};

onMounted(() => {
  listUpdate(1);
});


</script>

<template>
  <h1 class="text-black dark:text-white ml-2 my-2 font-bold uppercase">
    Hodimlar ro'yhati
  </h1>

  <!-- Main modal -->
  <div
    id="empolyee"
    tabindex="-1"
    aria-hidden="true"
    :class="[
      modal
        ? 'hidden  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full'
        : 'wave overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-100',
    ]"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Yangi hodim qo'shish
          </h3>

          <button
            @click="showhide"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <!-- Modal body -->

        <form action="#" @submit.prevent="addUser">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ism</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Ism kiriting"
                required=""
                v-model="user.full_name"
              />
            </div>
            <div>
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Telefon raqam
              </label>
              <input
                type="tel"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Telefon raqam kiriting"
                required=""
                v-model="user.phone_number"
              />
            </div>
            <div>
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Plastik</label
              >
              <input
                type="text"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="8600 1234 5678 9001"
                required=""
                v-model="user.card"
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Lavozimi</label
              >
              <select
                @change="user.role = $event.target.value"
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected="">Lavozim tanlang</option>
                <option value="OPERATOR">Operator</option>
                <option value="ADMIN">Admin</option>
                <option value="DELIVERYMAN">Yetkazuvchi</option>
              </select>
            </div>

            <div>
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Login</label
              >
              <input
                type="text"
                name="price"
                id="login"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="login kiriting"
                required=""
                v-model="user.login"
              />
            </div>

            <div>
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Parolni
              </label>
              <input
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="**************"
                required=""
                v-model="user.password"
              />
            </div>
          </div>
          <button
            type="submit"
            class="dark:text-white border border-gray-200 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              class="mr-1 -ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Qo'shish
          </button>
        </form>
      </div>
    </div>
  </div>

  <section class="bg-gray-50 dark:bg-gray-900 sm:p-5 md:p-0 my-2">
    <div class="mx-auto max-w-screen-x lg:px-0">
      <!-- Start coding here -->
      <div
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 m-0"
        >
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Qidiruv</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Qidiruv"
                  required=""
                />
              </div>
            </form>
          </div>

          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <button
              @click="showhide"
              id="empolyee"
              type="button"
              aria-hidden="true"
              class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                class="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Yangi hodim qo'shish
            </button>

            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button
                id="actionsDropdownButton"
                data-dropdown-toggle="actionsDropdown"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  class="-ml-1 mr-1.5 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
                Faol
              </button>
              <div
                id="actionsDropdown"
                class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="actionsDropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Faol</a
                    >
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    href="#"
                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Faol</a
                  >
                </div>
              </div>
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="h-4 w-4 mr-2 text-gray-400"
                  viewbox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Filter
                <svg
                  class="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
              <div
                id="filterDropdown"
                class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Roleni tanlang
                </h6>
                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                  <li class="flex items-center">
                    <input
                      id="apple"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="apple"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >Apple (56)</label
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">I.F.O</th>
                <th scope="col" class="px-4 py-3">Lavozimi</th>
                <th scope="col" class="px-4 py-3">Qo'shilgan sana</th>
                <th scope="col" class="px-4 py-3">Plastik raqami</th>
                <th scope="col" class="px-4 py-3">Holati</th>
                <th scope="col" class="px-4 py-3">is Active</th>

                <th scope="col" class="px-4 py-3">O'chirish</th>
              </tr>
            </thead>
            <h1 v-if="!state.LIST.length" class="text-center upparcse my-3 text-xl">
              Ma'lumot topilmadi !
            </h1>
            <tbody v-else>
              <tr
                v-for="(el, index) in state.LIST"
                :key="index"
                class="border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.full_name }}
                </th>
                <td class="px-4 py-3">{{ el?.role }}</td>
                <td class="px-4 py-3">{{ el?.createdAt?.substring(0, 10) }}</td>
                <td class="px-4 py-3">{{ el?.card }}</td>
                <td class="px-4 py-3">{{ el?.is_active ? "faol" : "faol emas" }}</td>
                <td class="px-4 py-3">
                  <button
                    @click="is_active(el.is_active, el._id)"
                    :class="
                      el?.is_active
                        ? 'bg-green-500 py-1 px-3 text-white rounded-2xl focus:ring-2'
                        : 'bg-red-500 py-1 px-3 text-white rounded-2xl focus:ring-2'
                    "
                  >
                    {{ el?.is_active ? "ON" : "OFF" }}
                  </button>
                </td>

                <td class="px-4 py-3">
                  <button
                    @click="onDelete(el._id)"
                    class="bg-red-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav
          class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Sahifalar
            <span class="font-semibold text-gray-900 dark:text-white"
              >1 - {{ totalPage }}</span
            >
            dan
            <span class="font-semibold text-gray-900 dark:text-white">{{
              totalPage
            }}</span>
          </span>

          <ul class="inline-flex items-stretch -space-x-px">
            <li v-for="(el, ind) in totalPage" @click="paginate(ind + 1)" :key="el">
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >{{ ind + 1 }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wave {
  background-color: #05002981;
  backdrop-filter: blur(2px);
}
</style>
