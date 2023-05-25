import AIForm from '@components/AIForm'
import AIFormAsync from '@components/AIFormAsync'
import ItemListSections from '@components/ItemListSections'
// import list from '../italy_list.json'
import section_list from '../italy-with-sections-ctas.json'

export default function ExampleList() {
    return (
        <>
            <ItemListSections data = {section_list}/>
        </>
    )
}