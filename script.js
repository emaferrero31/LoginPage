document.addEventListener('DOMContentLoaded', function(){

    const loginForm = document.getElementById('loginForm')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')
    const confirmPasswordError = document.getElementById('confirmPasswordError')
    const showHideButton = document.getElementById('show-hide')

    loginForm.addEventListener('submit', function(event){
        event.preventDefault();
        validateForm()//ToDo agregar metodo que valide el formulario
    })

    emailInput.addEventListener('blur', function(){
        validateEmail()//ToDo agregar metodo que valide el email
    })

    emailInput.addEventListener('change', function(){
        clearError(emailError)//ToDo agregar metodo que limpie el error
    })

    
    passwordInput.addEventListener('change', function(){
        clearError(passwordError)//ToDo agregar metodo que limpie el error
    })

    
    confirmPasswordInput.addEventListener('change', function(){
        clearError(confirmPasswordError)//ToDo agregar metodo que limpie el error
    })

    showHideButton.addEventListener('click', function(){
        if(passwordInput.type == 'password'){
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        }else{
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })


    //FUNCIONES DE LOS LISTENER ANETRIORES

    function validateForm() {
        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        const passwordMatch = validatePasswordMatch()

        if(isValidEmail && isValidPassword && passwordMatch){
             saveToLocalStorage()//guardar mail en el localStorage y generar JSON en consola
            alert('Has ingresado con exito')
        }
    }

    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9._%-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim() //trim elimina espacios vacios al comienzo y final de los input

        if(!emailRegex.test(emailValue)){
            showError(emailError, 'Ingrese un email valido!')
            return false
        }
        return true
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim()
        if(passwordValue.length < 8){
            showError(passwordError, 'Ingrese una contraseña de al menos 8 caracteres!')
            return false
        }
        return true
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim()
        const confirmPasswordValue = passwordInput.value.trim()

        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, 'Las contraseñas no coinciden!')
            return false
        }
        return true
    }

    function showError(errorElement, message){
        errorElement.innerHTML = message
        errorElement.style.display = 'block'
    }
    
    
    function clearError(errorElement){
        errorElement.innerHTML = ''
        errorElement.style.display = 'none'
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value.trim()
        localStorage.setItem('email', emailValue)
        const body = bodyBuilderJSON()//JSON
        console.log(body)
    }

    function bodyBuilderJSON() {
        return{
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }

})