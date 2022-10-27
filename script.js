const [form] = document.forms;
const [usernameFeedback, passwordFeedback, confirmPasswordFeedback] = document.querySelectorAll('.feedback');

const isUsernameValid = username => {
  return username.length > 5 && username.length <= 20;
}

const isPasswordValid = password => {
  return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,20}$/gm.test(password);
}

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword;  
}

const formValidation = (username, password, confirmPassword) => {
  return(
    isUsernameValid(username) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword)
  );
}

const getElement = (name, e) => {
  return {
    username(e){
      e.target.classList.toggle('border-danger', !isUsernameValid(e.target.value));
      
    },
    password(e){
      e.target.classList.toggle('border-danger', !isPasswordValid(e.target.value));
    },
   confirmPassword(e){
      e.target.classList.toggle('border-danger', !isPasswordMatch(form.password.value, e.target.value));
    },
  }[name](e);
}

const handleInput = e => {
  const { username, password, confirmPassword, btn } = form;
  const { name } = e.target;
  
  document.getElementById('result').textContent = '';
  getElement(name, e);
  btn.disabled = !formValidation(username.value, password.value, confirmPassword);
};

document.addEventListener('DOMContentLoaded', () => {
  form.username.addEventListener('input', handleInput);
  form.password.addEventListener('input', handleInput);
  form.confirmPassword.addEventListener('input', handleInput);
});