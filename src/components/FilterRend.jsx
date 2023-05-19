export const FilterRend = ({filtertg,funcfiltr}) => {
    return (
        <input type="text" value={filtertg} onChange={funcfiltr} />
    )
}