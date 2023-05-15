import { Button, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import "./TodoForm.scss";
const TodoForm = (props) => {
  const [form] = Form.useForm();
  return (
    <div className="todo-form">
      <Form
        name="todo"
        className="todo-form-container"
        form={form}
        {...{
          ...props,
          onFinish: (data) => {
            form.resetFields();
            props.onFinish(data);
          },
        }}
      >
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
