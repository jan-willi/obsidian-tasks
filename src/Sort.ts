import type { Task } from './Task';

export class Sort {
    public static byStatusThenDateThenPath(tasks: Task[]): Task[] {
        return tasks.sort(Sort.compareByStatus);
    }

    private static compareByStatus(a: Task, b: Task): -1 | 0 | 1 {
        if (a.status < b.status) {
            return 1;
        } else if (a.status > b.status) {
            return -1;
        } else {
            return Sort.compareByDate(a, b);
        }
    }

    private static compareByDate(a: Task, b: Task): -1 | 0 | 1 {
        if (a.dueDate !== null && b.dueDate === null) {
            return -1;
        } else if (a.dueDate === null && b.dueDate !== null) {
            return 1;
        } else if (a.dueDate !== null && b.dueDate !== null) {
            if (a.dueDate.isSame(b.dueDate, 'day')) {
                return Sort.compareByTime(a, b);
            } else if (a.dueDate.isAfter(b.dueDate)) {
                return 1;
            } else if (a.dueDate.isBefore(b.dueDate)) {
                return -1;
            } else {
                return Sort.compareByPath(a, b);
            }
        } else {
            return Sort.compareByPath(a, b);
        }
    }

    private static compareByTime(a: Task, b: Task): -1 | 0 | 1 {
        if (a.dueTime !== null && b.dueTime === null) {
            return -1;
        } else if (a.dueTime === null && b.dueTime !== null) {
            return 1;
        } else if (a.dueTime !== null && b.dueTime !== null) {
            if (a.dueTime.isAfter(b.dueTime)) {
                return 1;
            } else if (a.dueTime.isBefore(b.dueTime)) {
                return -1;
            } else {
                return Sort.compareByPath(a, b);
            }
        } else {
            return Sort.compareByPath(a, b);
        }
    }

    private static compareByPath(a: Task, b: Task): -1 | 0 | 1 {
        if (a.path < b.path) {
            return -1;
        } else if (a.path > b.path) {
            return 1;
        } else {
            return 0;
        }
    }
}
