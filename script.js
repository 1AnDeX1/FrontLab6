function getRandomUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://randomuser.me/api/?results=5')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          resolve(data.results);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  document.getElementById('getUsersButton').addEventListener('click', function () {
    getRandomUsers()
      .then(users => {
        const allUsersDiv = document.getElementById('all-users');
        allUsersDiv.innerHTML = '';
  
        users.forEach(user => {
          const userDiv = document.createElement('div');
          userDiv.classList.add('user');
  
          const userImage = document.createElement('img');
          userImage.src = user.picture.large;
          userDiv.appendChild(userImage);
  
          const userInfoDiv = document.createElement('div');
          userInfoDiv.classList.add('user-info');
  
          const cityItem = document.createElement('p');
          cityItem.textContent = `City: ${user.location.city}`;
          userInfoDiv.appendChild(cityItem);
  
          const nameItem = document.createElement('p');
          nameItem.textContent = `Name: ${user.name.first} ${user.name.last}`;
          userInfoDiv.appendChild(nameItem);
  
          const cellItem = document.createElement('p');
          cellItem.textContent = `Cell: ${user.cell}`;
          userInfoDiv.appendChild(cellItem);
  
          const phoneItem = document.createElement('p');
          phoneItem.textContent = `Phone number: ${user.phone}`;
          userInfoDiv.appendChild(phoneItem);
  
          userDiv.appendChild(userInfoDiv);
          allUsersDiv.appendChild(userDiv);
        });
      })
      .catch(error => {
        console.error('Виникла помилка при отриманні даних:', error);
      });
  });
  