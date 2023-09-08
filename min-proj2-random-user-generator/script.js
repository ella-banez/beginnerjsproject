function fetchUser() {
  showSpinner();
  fetch('https://randomuser.me/api/')
  .then((response) => {
    if (!response.ok){
      throw new Error ('Request Failed');
    }
    return response.json()
  })
  .then((data) => {
    hideSpinner();
    displayUser(data.results[0]);
  })
  .catch((error) => {
    hideSpinner();
    document.querySelector('#user').innerHTML = `<p class="text-xl text-center text-red-500">${error}<p/>`;
    document.body.style.backgroundColor = 'rgb(254, 39, 1, 0.38)';
  });
}

function displayUser(user) {
  const userDisplay = document.querySelector('#user');

  if (user.gender === 'female'){
    document.body.style.backgroundColor = 'plum'
  } else{
    document.body.style.backgroundColor = 'lightskyblue'
  }

  userDisplay.innerHTML = `
  <div class="flex justify-between">
  <div class="flex">
    <img
      class="w-48 h-48 rounded-full mr-8"
      src="${user.picture.large}"
    />
    <div class="space-y-3">
      <p class="text-xl">
        <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
      </p>
      <p class="text-xl">
        <span class="font-bold">Email: </span> ${user.email}
      </p>
      <p class="text-xl">
        <span class="font-bold">Phone: </span> ${user.phone}
      </p>
      <p class="text-xl">
        <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
      </p>
      <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
    </div>
  </div>
</div>`;
 
}

function showSpinner(){
  document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner(){
  document.querySelector('.spinner').style.display = 'none';
}

document.querySelector('#generate').addEventListener('click', fetchUser);

fetchUser();