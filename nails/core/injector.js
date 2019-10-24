export class Injector {
    constructor(state) {
        this.state = state;
        this.bootstrap();
    }
    bootstrap() {
        if (Array.isArray(this.state.injectors)) {
            return;
        }
        this.state.injectors = [];
    }

    insert(clazz) {
        for (var c of this.state.injectors) {
            if (c instanceof clazz) return;
        }
        this.state.injectors.push(clazz);
    }
    resolve(clazz) {
        for (var c of this.state.injectors) {
            if (c instanceof clazz) return c;
        }
    }
}