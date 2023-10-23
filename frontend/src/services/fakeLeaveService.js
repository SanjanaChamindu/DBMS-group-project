const leaves = [
    {
            leave_id: 1,
            leave_type: 'type1',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 2,
            leave_type: 'type2',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 3,
            leave_type: 'type3',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 4,
            leave_type: 'type4',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 5,
            leave_type: 'type5',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 6,
            leave_type: 'type6',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 7,
            leave_type: 'type7',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 8,
            leave_type: 'type8',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 9,
            leave_type: 'type9',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 10,
            leave_type: 'type10',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 11,
            leave_type: 'type11',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 12,
            leave_type: 'type12',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 13,
            leave_type: 'type13',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 14,
            leave_type: 'type14',
            taken: '9',
            remaining: '10'
        },
        {
            leave_id: 15,
            leave_type: 'type15',
            taken: '9',
            remaining: '10'
        }
    ];

    export function getLeaves() {
        return leaves;
    }

    export function getLeave(id) {
        return leaves.find(em => em.leave_id === id);
    }