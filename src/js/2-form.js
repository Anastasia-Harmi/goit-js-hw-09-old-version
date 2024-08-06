const feedbackFormEl = document.querySelector('.feedback-form'); //1.шукаю елемент на сторінці
let formData = {
  email: '',
  message: '',
};

// 5.Дістаю дані з локал схов. Створюю для цього ф-ію

const fillFormFields = () => {
  const formDataFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ); //в змінну запис знач з лок сховщ по ключу

  if (formDataFromLS === null) {
    //якщо поля пусті, то там не вводилось нічого і витягати нема що і лежить null, тому виходим з ф-ії
    return;
  }
  formData = formDataFromLS;

  for (const key in formDataFromLS) {
    //перебираємо обєкт із лок схов і нижче перевірка чи власна властивість, якщо так, то
    if (formDataFromLS.hasOwnProperty(key)) {
      feedbackFormEl.elements[key].value = formDataFromLS[key]; //всередині форми зверт до ключа, щоб зчитавзнач ключа, а не створив новий ключ і далі до його значення зверт і перезаписуєм на те , що перебир по ключу
    }
  }
};
fillFormFields(); // виклик ф-ії

//3.Створюю ф-ію обробник події input
const onFormFieldChange = event => {
  const fieldName = event.target.name; //в цю змінну записую назву поля , де відбулась подія, так як є атрибут name ,який вказує на тип поля і він записується як ключ
  const fieldValue = event.target.value; //в цю змінну записую значення введене юзером у полі
  formData[fieldName] = fieldValue; //formData[fieldName] це назва ключа, а саме тип поля в якому вводить юзер. fieldValue - значення цього ключа

  //4. Записуємо об'єкт у сховище локальне(те, що зберігає інформацію і після перезавантажень)
  localStorage.setItem('feedback-form-state', JSON.stringify(formData)); //'feedback-form-state'-назву ключа для лок.схов. я придумую сама, приводжу до рядка наш об'єкт з даними з полів, бо лок сховище приймає лише рядки
};

//6.функція обробник для кнопки відправки(submit)

const onFeedbackFormSubmit = event => {
  event.preventDefault(); //відмінила дію за замовч браузера
  const email = formData.email.trim();
  const message = formData.message.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }
  event.target.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
};

feedbackFormEl.addEventListener('input', onFormFieldChange); // 2.додаю слухача на поля введення, подія input (створюється щоразу при зміні значення в полі)
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
