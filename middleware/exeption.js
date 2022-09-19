export default function ({ $axios, redirect, store }) {
  $axios.onError((error) => {
    if (error.response.status === 419) {
      redirect("/login");
      alert("oooooooooooo");
    }
    if (1 > 0) {
      return redirect("/login");
    }
  });
}
