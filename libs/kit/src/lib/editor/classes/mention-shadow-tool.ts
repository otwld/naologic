import { create } from '../utils/create';

export type MentionData = {
  name: string;
  id: string;
  slug: string;
  avatar?: string;
};

export type MentionToolConstructor<T> = {
  holder: HTMLElement;
  data: T[];
  accessKeys: string[];
  /**
   * Main access key to be used for creating the text node.
   */
  mainAccessKey: string;
  renderer: {
    createTextNode: (data: T) => string;
    textNodeClassName: string;
  };
};

/**
 * User Mention Primary API class
 */
export default class MentionShadowTool<T extends MentionData> {
  private readonly holder: MentionToolConstructor<T>['holder'];
  private readonly data: MentionToolConstructor<T>['data'];
  private readonly accessKeys: MentionToolConstructor<T>['accessKeys'];
  private readonly mainAccessKey: MentionToolConstructor<T>['mainAccessKey'];
  private readonly initialUserlistItemsOrder: any[];
  private prevActiveElement: HTMLElement | null;
  private prevCaretPosAndSelectedNode: {
    selectedNode: Node | null;
    caretPos: number | null;
  };
  private readonly nodes: {
    dataList: any;
    searchBar: any;
    toolbar: HTMLElement;
  };
  private readonly renderer: MentionToolConstructor<T>['renderer'];

  /**
   * TODO: Handle accessKeys as an array of strings.
   * @param holder
   * @param data
   * @param accessKeys
   */
  constructor({
    holder,
    data,
    accessKeys = ['@'],
    mainAccessKey,
    renderer,
  }: MentionToolConstructor<T>) {
    /*
     * Property to hold holder.
     */
    this.holder = holder;

    /**
     * Property which holds all users data.
     */
    this.data = data;

    /**
     * Property which stores the base url
     */
    this.accessKeys = accessKeys;

    /**
     * Property which holds the main access key.
     */
    this.mainAccessKey = mainAccessKey;

    /**
     * Property which holds the renderer object.
     */
    this.renderer = renderer;

    /**
     * Property which holds all user list items in order
     */
    this.initialUserlistItemsOrder = this.createAllUserListItems(this.data);

    /**
     * Property which holds previous active element
     * for inserting the user mention link once user selects the required option.
     */
    this.prevActiveElement = null;
    this.prevCaretPosAndSelectedNode = {
      caretPos: null,
      selectedNode: null,
    };

    console.info(this.initialUserlistItemsOrder);
    const dataList = this.createDataList(this.initialUserlistItemsOrder);
    const searchBar = this.createSearchbar(this.data);

    /**
     * Creates ans stores users list and user mention toolbar container.
     */
    this.nodes = {
      dataList,
      searchBar,
      toolbar: this.createUserMentionToolbar(searchBar, dataList),
    };

    /**
     * Appends user mention toolbar to document.
     */
    document.body.appendChild(this.nodes.toolbar);

    /**
     * Hides the user mention toolbar and changes the focus to previously focused input.
     */
    this.hideUserMentionToolbarAndChangeFocus(this.holder);

    /**
     * Hides user mention toolbar on page scroll
     */
    window.addEventListener('scroll', () => {
      this.hideUserMentionToolbar();
    });
  }

  /**
   * CSS Styles
   */
  get CSS() {
    return {
      /**
       * User Mention Toolbar related styles.
       */
      userMentionToolbar: 'user-mention-toolbar',
      userMentionToolbarShowed: 'user-mention-toolbar--showed',
      userMentionToolbarLeftOriented: 'user-mention-toolbar--left-oriented',
      userMentionToolbarLeftOrientedShowed:
        'user-mention-toolbar--left-oriented--showed',
      userMentionToolbarRightOriented: 'user-mention-toolbar--right-oriented',
      userMentionToolbarRightOrientedShowed:
        'user-mention-toolbar--right-oriented--showed',
      userMentionToolbarShortcut: 'user-mention-toolbar__shortcut',
      /**
       * Search bar styles
       */
      searchBar: 'user-mention-search-bar',
      searchIcon: 'search-icon',
      searchTextbox: 'search-textbox',
      /**
       * User list styles
       */
      usersListWrapper: 'users-list-wrapper',
      /**
       * User list item styles
       */
      userListItemWrapper: 'user-list-item-wrapper',
      userProfileContainer: 'user-profile-container',
      userNameInitial: 'user-name-initial',
      imageAvatar: 'user-image-avatar',
      userMetadataContainer: 'user-metadata-container',
      userFullName: 'user-full-name',
      userSlug: 'user-slug',
    };
  }

  /**
   * Returns the caret position and the selected node in the contentEditable element.
   *
   * @param {HTMLElement} editableDiv
   *
   * @returns {object} res
   * @returns {integer} res.caretPos
   * @returns {HTMLTextElement} res.selectedNode
   */
  getCaretPositionAndSelectedNode(editableDiv: HTMLElement) {
    let caretPos = 0,
      sel,
      range;

    if (window.getSelection) {
      sel = window.getSelection();

      if (sel && sel.rangeCount) {
        range = sel.getRangeAt(0);

        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    }
    // else if (document.selection && document.selection.createRange) {
    //   range = document.selection.createRange();
    //
    //   if (range.parentElement() == editableDiv) {
    //     var tempEl = document.createElement("span");
    //     editableDiv.insertBefore(tempEl, editableDiv.firstChild);
    //
    //     var tempRange = range.duplicate();
    //     tempRange.moveToElementText(tempEl);
    //     tempRange.setEndPoint("EndToEnd", range);
    //
    //     caretPos = tempRange.text.length;
    //   }
    // }

    return {
      caretPos: caretPos,
      selectedNode: range?.endContainer ?? null,
    };
  }

  /**
   * Focuses on the starting position of the provided textNode.
   *
   * @param textNode - text node element
   *
   * @returns null
   */
  focusAfterInsertingUserMention(textNode: Node) {
    const range = document.createRange();

    range.setStart(textNode, 0);
    range.setEnd(textNode, 0);

    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  /**
   * Returns the exact caret position inside an editable div
   * from top point in terms of left and right.
   *
   * @returns {object} res
   * @returns {integer} res.left - left position co-ordinate.
   * @returns {integer} res.top - top position co-ordinate.
   */
  getUserMentionToolbarPosition() {
    const sel = window.getSelection();
    if (!sel) return;
    const r = sel.getRangeAt(0);

    let rect;
    let r2;

    const node = r.startContainer;
    const offset = r.startOffset;

    if (offset > 0) {
      r2 = document.createRange();
      r2.setStart(node, offset - 1);
      r2.setEnd(node, offset);

      rect = r2.getBoundingClientRect();

      return { left: rect.right, top: rect.top };
    } else if (offset < node.childNodes.length) {
      r2 = document.createRange();

      r2.setStart(node, offset);
      r2.setEnd(node, offset + 1);
      rect = r2.getBoundingClientRect();

      return { left: rect.left, top: rect.top };
    } else {
      // throw new Error('[MentionTool] Error in getting caret position');
      // rect = node.getBoundingClientRect();
      rect = r.getBoundingClientRect();

      if (!node.parentElement)
        throw new Error('Error in getting parent element');

      const styles = getComputedStyle(node.parentElement);
      const lineHeight = parseInt(styles.lineHeight);
      const fontSize = parseInt(styles.fontSize);

      const delta = (lineHeight - fontSize) / 2;

      return { left: rect.left, top: rect.top + delta };
    }
  }

  /**
   * Creates and returns an array of all user list items.
   *
   * @param {Array} data
   *
   * @returns {Array} userListItems - all user list item components.
   * @returns {HTMLElement} serListItems[i] - user list item component.
   */
  createAllUserListItems(data: T[]) {
    /**
     * Appends all user list item components in the provided order
     * for initial rnder and when no search query is provided.
     */
    console.info(data);
    return data.map((item) =>
      this.createDataListItem(item)
    );
  }

  /**
   * Creates and returns user mention toolbar.
   *
   * @param {HTMLElement} searchBar
   * @param {HTMLElement} usersList
   *
   * @returns {HTMLElement} user mention toolbar component.
   */
  createUserMentionToolbar(searchBar: HTMLElement, usersList: HTMLElement) {
    /**
     * Creates user mention toolbar and appends the search bar and the users list component.
     */
    const userMentionToolbar = create(
      'div',
      [this.CSS.userMentionToolbar],
      {},
      [searchBar, usersList]
    );

    /**
     * Hide it by default.
     */
    userMentionToolbar.style.display = 'none';

    /**
     * returns user mention toolbar
     */
    return userMentionToolbar;
  }

  /**
   * Displays the user mention toolbar.
   */
  showUserMentionToolbar() {
    const caretPos = this.getUserMentionToolbarPosition();
    if (!caretPos)
      throw new Error('[MentionTool] Error in getting caret position');

    /**
     * Shows the hidden user mention toolbar.
     */
    this.nodes.toolbar.style.display = 'block';

    /**
     * Moves the user mention toolbar to the appropriate position of '@'.
     */
    this.nodes.toolbar.style.position = 'fixed';
    this.nodes.toolbar.style.left = caretPos.left - 16 + 'px';
    this.nodes.toolbar.style.top = caretPos.top - 4 + 'px';

    /**
     * Focus inside the search bar textbox
     */
    this.nodes.searchBar.children[1].focus();
  }

  /**
   * Hides the displayed user mention toolbar.
   */
  hideUserMentionToolbar() {
    /**
     * Shows the hidden user mention toolbar.
     */
    this.nodes.toolbar.style.display = 'none';

    /**
     * Empties the search bar text value.
     */
    this.nodes.searchBar.children[1].value = '';
  }

  /**
   * Hides the user mention toolbar and changes the focus to previously focused input.
   *
   * @param {string} mainWrapper - editor holder property.
   */
  hideUserMentionToolbarAndChangeFocus(holder: HTMLElement) {
    /**
     * Event listner to listen to changes in the current content editable.
     * if '@' is inserted, then shows the user mention toolbar.
     *
     * @param {event} e
     */
    const eventListner = (e: KeyboardEvent) => {
      if (!this.prevActiveElement)
        throw new Error(
          '[MentionTool] Error in getting previous active element'
        );
      /**
       * Updates caret position and selected node on every key up.
       */
      this.prevCaretPosAndSelectedNode = this.getCaretPositionAndSelectedNode(
        this.prevActiveElement
      );

      /**
       * Shows the user mention toolbar on inputting '@'.
       */
      if (this.accessKeys.includes(e.key)) {
        // e.preventDefault();
        this.showUserMentionToolbar();
      }
    };

    /**
     * Event listner to listen for focus event on editor.
     */
    holder.addEventListener('focusin', () => {
      /**
       * Checks if the focused element is not user mention toolbar.
       */
      if (
        this.nodes.toolbar != document.activeElement &&
        !this.nodes.toolbar.contains(document.activeElement)
      ) {
        /**
         * Hides the user mention toolbar if it is being displayed.
         */
        if (this.nodes.toolbar.style.display != 'none') {
          this.hideUserMentionToolbar();

          /**
           * Focuses on the previous element after hiding.
           */
          if (this.prevActiveElement) {
            this.prevActiveElement.focus();
          }
        } else {
          /**
           * Updates previous active element and add the above event listner to it.
           */
          console.info(document.activeElement);
          if (!(document.activeElement instanceof HTMLElement))
            throw new Error('[MentionTool] Error in getting active element');
          this.prevActiveElement = document.activeElement as HTMLElement | null;
          if (!this.prevActiveElement)
            throw new Error(
              '[MentionTool] Error in getting previous active element'
            );
          this.prevActiveElement.addEventListener('keyup', eventListner);
        }
      }
    });
  }

  /**
   * Creates and returns the user list compoennt which contains all the user list item components.
   *
   * @param {Array} userListItems
   *
   * @returns {HTMLElement} user list wrapper.
   */
  createDataList(userListItems: any[]) {
    console.info(userListItems);
    /**
     * Creates a wrapper to hold all user list items.
     */
    const usersListWrapper = create(
      'div',
      [this.CSS.usersListWrapper],
      {},
      userListItems
    );

    /**
     * border-bottom of last user list item is removed.
     * Because ther eis already a border of users list wrapper.
     */
    if (usersListWrapper.childNodes.length > 0) {
      if (!usersListWrapper.lastChild)
        throw new Error(
          '[MentionTool] Error in getting last child of user list wrapper'
        );
      if (!('style' in usersListWrapper.lastChild))
        throw new Error(
          '[MentionTool] Error in getting style of last child of user list wrapper'
        );
      (usersListWrapper.lastChild.style as any).borderBottom = 0;
    }

    /**
     * Returns users list component.
     */
    return usersListWrapper;
  }

  /**
   * Creates and returns search bar component.
   *
   * @returns {HTMLElement} search bar.
   */
  createSearchbar(data: T[]): HTMLElement {
    /**
     * Creates search icon.
     */
    const searchIcon = create('div', [this.CSS.searchIcon], {}, [
      document.createTextNode(this.accessKeys[0]),
    ]);

    /**
     * Creates search textbox.
     */
    const searchTextbox = create('input', [this.CSS.searchTextbox], {
      type: 'text',
      placeholder: 'User',
    }) as HTMLInputElement;

    /**
     * Event lister that fetches users based on the inputted query.
     */
    const searchQueryListner = (event: Event) => {
      try {
        const newUserList = data.filter(
          (c: T) =>
            c?.name
              ?.toLowerCase()
              .includes(String(searchTextbox.value).toLowerCase()) ||
            c?.slug
              ?.toLowerCase()
              .includes(String(searchTextbox.value).toLowerCase())
        );
        const newUserListItem = this.createAllUserListItems(newUserList);
        console.info('newUserList', newUserList);
        /**
         * Removes all the current user list items.
         */
        this.nodes.dataList.innerHTML = '';

        /**
         * Creates a new user list from the created user list items.
         */
        this.nodes.toolbar.lastChild?.replaceWith(
          this.createDataList(newUserListItem)
        );
        // console.log(newUserList);
      } catch (error) {
        console.log(error);
      }
    };

    searchTextbox.addEventListener('keyup', searchQueryListner);
    searchTextbox.addEventListener('keydown', searchQueryListner);
    searchTextbox.addEventListener('keypress', searchQueryListner);

    /**
     * Creates search bar.
     */
    const searchBar = create('div', [this.CSS.searchBar], {}, [
      searchIcon,
      searchTextbox,
    ]);

    /**
     * returns search bar component.
     */
    return searchBar;
  }

  /**
   * Creates and returns user list item component.
   *
   * @returns {HTMLElement} user list item component.
   * @param data
   */
  createDataListItem(data: T) {
    const {
      id,
      name,
      avatar,
      slug,
    } = data;
    /**
     * Creates data item's name container.
     */
    const dataItemNameContainer = create('span', [this.CSS.userFullName], {}, [
      document.createTextNode(name),
    ]);

    /**
     * Creates user slug container.
     */
    const dataItemSlugContainer = create('span', [this.CSS.userSlug], {}, [
      document.createTextNode(this.renderer.createTextNode(data)),
    ]);

    /**
     * Creates data item's metadata container in which data item name and id are appended.
     */
    const dataItemMetadataContainer = create(
      'div',
      [this.CSS.userMetadataContainer],
      {},
      [dataItemNameContainer, dataItemSlugContainer]
    );

    /**
     * Creates user name initial to be at the center fo the profile container.
     */
    const dataItemInitial = create('span', [this.CSS.userNameInitial], {}, [
      document.createTextNode(name[0].toUpperCase()),
    ]);

    /**
     * Creates data item's avatar to be at the center fo the profile container.
     */
    const dataItemAvatar = create('img', [this.CSS.imageAvatar], {
      src: avatar || false,
    });

    /**
     * Creates data item's profile container.
     */
    const dataItemProfileContainer = create(
      'div',
      [this.CSS.userProfileContainer],
      {},
      [avatar ? dataItemAvatar : dataItemInitial]
    );

    /**
     * Creates user list item wrapper and appends profile and metadata container.
     */
    const dataItemListItemContainer = create(
      'div',
      [this.CSS.userListItemWrapper],
      {},
      [dataItemProfileContainer, dataItemMetadataContainer]
    );

    /**
     * Selects the data item and appends its name with @ as a link in the paragraph data.
     */
    dataItemListItemContainer.addEventListener('click', () => {
      /**
       * Creates user mention link to be added in the previous input or
       * content editable element.
       */
      const userMentionLink = create(
        'span',
        ['cdx-mention', this.renderer.textNodeClassName],
        {
          // href: baseUrl + userSlug,
          target: '_blank',
          contentEditable: false,
        },
        [document.createTextNode(this.renderer.createTextNode(data))]
      );

      /**
       * Gets caret position and selected node from which the '@' in inputted.
       */
      const { caretPos, selectedNode } = this.prevCaretPosAndSelectedNode;

      if (!selectedNode)
        throw new Error('[MentionTool] Error in getting selected node');
      if (!caretPos)
        throw new Error('[MentionTool] Error in getting caret position');
      if (!selectedNode.textContent)
        throw new Error(
          '[MentionTool] Error in getting selected node text content'
        );

      /**
       * Slices the textNode into 2 parts where '@' is inputted.
       */
      const firstHalf = document.createTextNode(
        selectedNode.textContent.slice(0, caretPos - 1)
      );
      const secondHalf = document.createTextNode(
        selectedNode.textContent.slice(caretPos)
      );

      if (!this.prevActiveElement)
        throw new Error(
          '[MentionTool] Error in getting previous active element'
        );

      /**
       * Inserts the link between the two halfs of the selected node.
       */
      this.prevActiveElement.insertBefore(firstHalf, selectedNode);
      this.prevActiveElement.insertBefore(userMentionLink, selectedNode);
      this.prevActiveElement.insertBefore(secondHalf, selectedNode);

      /**
       * Removes the original text node.
       */
      this.prevActiveElement.removeChild(selectedNode);

      /**
       * Hides the user mention toolbar once the user mention link is inserted.
       */
      this.hideUserMentionToolbar();

      /**
       * Focus on the second half's 0th index.
       */
      this.focusAfterInsertingUserMention(secondHalf);
    });

    /**
     * Returns the user list item.
     */
    return dataItemListItemContainer;
  }
}
