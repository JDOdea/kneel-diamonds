import { getMetals, getOrderBuilder, getOrders, getSizes, getStyles, getTypes, setType } from "./database.js"

const metals = getMetals()
const sizes = getSizes()
const styles = getStyles()
const types = getTypes()
const orderBuilder = getOrderBuilder()

document.addEventListener(
    "change",
    (e) => {
        if (e.target.name === "type") {
            setType(parseInt(e.target.value))
        }
    }
)


const buildOrderListItem = (order) => {

    //FINDING METAL PRICE
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    let totalCost = foundMetal.price

    //FINDING SIZE PRICE
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    totalCost += foundSize.price

    //FINDING STYLE PRICE
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    totalCost += foundStyle.price

    //FINDING TYPE MULTIPLIER
    const foundType = types.find(
        (type) => {
            return type.id === order.typeId
        }
    )
    totalCost *= foundType.multiplier

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
        Order #${order.id} cost ${costString}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

// Define and export a function to generate type radio options
export const Types = () => {
    
    let html = ""

    for (const type of types) {
        if (orderBuilder.typeId === type.id) {
            html += `<input type="radio" name="type" value="${type.id}" checked /> ${type.type}`
        }
        else {
            html += `<input type="radio" name="type" value="${type.id}" /> ${type.type}`
        }

        
    }

    return html
}