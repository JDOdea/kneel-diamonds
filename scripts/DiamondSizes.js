import { getOrderBuilder, getSizes, setSize } from "./database.js"

const sizes = getSizes()
const orderBuilder = getOrderBuilder()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSize(parseInt(event.target.value))
        }
    }
)

export const DiamondSizes = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItems = sizes.map(size => {
        if (orderBuilder.sizeId === size.id) {
            return `<li>
            <input type="radio" name="size" value="${size.id}" checked /> ${size.carets}
        </li>`
        }else{
            return `<li>
            <input type="radio" name="size" value="${size.id}" /> ${size.carets}
        </li>`
        }
        
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}

