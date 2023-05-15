import { Button, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import "./TodoForm.scss";
const TodoForm = (props) => {
  return (
    <div className="todo-form">
      <Form name="todo" className="todo-form-container" {...props}>
        <div className="form-body">
          <FormItem name="body" style={{ marginBottom: "2px" }}>
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </FormItem>
        </div>

        <div className="form-button">
          <Button htmlType="submit"> Done </Button>
        </div>
      </Form>
    </div>
  );
};

export default TodoForm;
