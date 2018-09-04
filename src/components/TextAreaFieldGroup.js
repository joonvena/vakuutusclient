import React from 'react';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
                                name,
                                placeholder,
                                value,
                                info,
                                onChange
                            }) => {
    return (
        <div className="form-group">
      <textarea
          className={classnames('form-control form-control-lg', {})}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          rows={10}
      />
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    );
};


export default TextAreaFieldGroup;
