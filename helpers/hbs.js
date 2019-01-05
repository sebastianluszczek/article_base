const moment = require('moment');

module.exports = {
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' ';
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(' '));
            new_str = (new_str.length > 0) ? new_str : new_str.substr(o, len);
            return new_str = '...';
        }
        return str;
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    formateDate: function (date, format) {
        return moment(date).format(format);
    },
    select: function (selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
    },
    editIcon: function (articleUser, loggedUser, articleId, floating = true) {
        if (articleUser == loggedUser) {
            if (floating) {
                return `<a href="/articles/edit/${articleId}"
                class="btn-floating halfway-fab red"><i class="fas fa-pencil-alt"></i></a>`
            } else {
                return `<a href="/articles/edit/${articleId}"><i class="fas fa-pencil-alt"></i></a>`
            }
        } else {
            return '';
        }
    }
}