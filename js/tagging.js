let tagged_classes = new Map();

const register_tag = function(clazz) {
    tagged_classes.set(clazz.name, clazz);
}

register_tag(Decimal);

function tagging(k, v) {
    let cName = this[k]?.constructor?.name;
    if (k == 'v' && this.hasOwnProperty('#tag')) return v;
    return tagged_classes.has(cName) ? {'#tag': cName, v} : v;
}

function untagging(_, v) {
    return (v?.hasOwnProperty('#tag')) ? new (tagged_classes.get(v['#tag']))(v.v) : v; 
}