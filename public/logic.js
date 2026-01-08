
document.querySelector("#cur-year").textContent = new Date().getFullYear();

document.querySelector("#calculator").addEventListener("submit", async (e) => {
    e.preventDefault();

    let num1 = document.querySelector("#num1").value;
    let num2 = document.querySelector("#num2").value;
    let operator = document.querySelector("#operator-select").value;

    document.querySelector("#calculator").reset();
    
    const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num1, num2, operator })
    });
    if(!response.ok){
        document.querySelector("#calculator").reset();
    }else{
        const data = await response.json();
        document.querySelector(".result-h2").classList.remove("hidden");
        document.querySelector("#result-1").textContent = `${num1} ${operator} ${num2} `;
        document.querySelector("#result-2").textContent = data.result;
    }
});