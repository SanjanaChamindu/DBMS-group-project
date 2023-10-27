const dropdownData = [
    {
        label: 'Dropdown 1',
        options: [
            { id: 1, name: 'Option 1.1' },
            { id: 2, name: 'Option 1.2' },
            { id: 3, name: 'Option 1.3' }
        ]
    },
    {
        label: 'Dropdown 2',
        options: [
            { id: 4, name: 'Option 2.1' },
            { id: 5, name: 'Option 2.2' },
            { id: 6, name: 'Option 2.3' }
        ]
    }
];

export const getDropdownData = () => {
    return dropdownData;
}