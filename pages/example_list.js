import AIForm from '@components/AIForm'
import AIFormAsync from '@components/AIFormAsync'
import ItemList from '@components/ItemList'
import list from '../italy_list.json'

export default function ExampleList() {
    return (
        <>
            <ItemList items = {list}/>
        </>
    )
}