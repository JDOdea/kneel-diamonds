import { getMetals, getOrderBuilder, setMetal } from "./database.js"

const metals = getMetals()
const orderBuilder = getOrderBuilder()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            setMetal(parseInt(event.target.value))
        }
    }
)

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
    for (const metal of metals) {
        if (orderBuilder.metalId === metal.id) {
            html += `<li>
            <input type="radio" name="metal" value="${metal.id}" checked/> ${metal.metal}
        </li>`
        }
        else
        {
            html += `<li>
            <input type="radio" name="metal" value="${metal.id}" /> ${metal.metal}
        </li>`
        }
        
    }
    console.log(orderBuilder)

    html += "</ul>"
    return html
}

